import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { LetterTemplate } from "~/features/letters/data/letter-templates";
import { suratPernyataanBebasPlagiatSchema } from "~/features/letters/schemas/surat-pernyataan-bebas-plagiat.schema";
import { suratPemutakhiranDataSchema } from "~/features/letters/schemas/surat-pemutakhiran-data.schema";
import { validasiUseptSchema } from "~/features/letters/schemas/validasi-usept.schema";
import { generateSuratPernyataanBebasPlagiat } from "~/features/letters/templates/generate-surat-pernyataan-bebas-plagiat";
import { generateSuratPemutakhiranData } from "~/features/letters/templates/generate-surat-pemutakhiran-data";
import { generateValidasiUsept } from "~/features/letters/templates/generate-validasi-usept";

type GeneratorValues = {
  nama: string;
  nim: string;
  programStudi: string;
  judulTugasAkhir: string;
  tempatTanggal: string;
  screenshotUsept?: File;
};

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

async function getImageSize(file: File) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Gagal membaca ukuran gambar."));
      image.src = objectUrl;
    });

    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function getImageType(file: File): "png" | "jpg" {
  return file.type === "image/png" ? "png" : "jpg";
}

export function LetterGeneratorForm({
  template,
}: {
  template: LetterTemplate;
}) {
  const isPlagiarismLetter =
    template.id === "surat-pernyataan-bebas-plagiat";
  const isUseptLetter = template.id === "validasi-usept";
  const schema = isPlagiarismLetter
    ? suratPernyataanBebasPlagiatSchema
    : isUseptLetter
      ? validasiUseptSchema
    : suratPemutakhiranDataSchema;

  const form = useForm<GeneratorValues>({
    defaultValues: {
      nama: "",
      nim: "",
      programStudi: "D3 Manajemen Informatika Universitas Sriwijaya",
      judulTugasAkhir: "",
      tempatTanggal: "",
      screenshotUsept: undefined,
    },
    resolver: zodResolver(schema) as unknown as Resolver<GeneratorValues>,
  });

  async function onSubmit(values: GeneratorValues) {
    if (isUseptLetter) {
      if (!values.screenshotUsept) {
        return;
      }

      const [screenshotData, imageSize] = await Promise.all([
        values.screenshotUsept.arrayBuffer(),
        getImageSize(values.screenshotUsept),
      ]);
      const blob = await generateValidasiUsept({
        nama: values.nama,
        nim: values.nim,
        screenshot: {
          data: screenshotData,
          type: getImageType(values.screenshotUsept),
          width: imageSize.width,
          height: imageSize.height,
        },
      });

      downloadBlob(blob, template.outputFileName);
      toast.success("File surat berhasil dibuat.");
      return;
    }

    const blob = isPlagiarismLetter
      ? await generateSuratPernyataanBebasPlagiat(values)
      : await generateSuratPemutakhiranData(values);

    downloadBlob(blob, template.outputFileName);
    toast.success("File surat berhasil dibuat.");
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Alert>
        <AlertTitle>
          {isUseptLetter ? "Generator Surat Validasi USEPT" : "Generator awal"}
        </AlertTitle>
        <AlertDescription>
          {isUseptLetter
            ? "Screenshot USEPT hanya dibaca di browser untuk dimasukkan ke DOCX. Setelah diunduh, cetak surat dan minta validasi admin program studi serta koordinator program studi."
            : "Format dokumen ini masih placeholder. Periksa ulang isi, tanda tangan, materai, dan ketentuan final sebelum digunakan untuk pengajuan."}
        </AlertDescription>
      </Alert>

      <FieldGroup>
        <Controller
          control={form.control}
          name="nama"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nama Lengkap</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
                placeholder="Masukkan nama lengkap"
              />
              <FieldDescription>
                Gunakan nama lengkap sesuai data akademik.
              </FieldDescription>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="nim"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>NIM</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
                placeholder="Masukkan NIM"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {!isUseptLetter && (
          <Controller
            control={form.control}
            name="programStudi"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Program Studi</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id={field.name}
                  placeholder="Masukkan program studi"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        {isPlagiarismLetter && (
          <Controller
            control={form.control}
            name="judulTugasAkhir"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Judul Tugas Akhir
                </FieldLabel>
                <Textarea
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id={field.name}
                  placeholder="Masukkan judul tugas akhir"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        {isUseptLetter ? (
          <Controller
            control={form.control}
            name="screenshotUsept"
            render={({ field: { name, onBlur, onChange, ref }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={name}>Screenshot Nilai USEPT</FieldLabel>
                <Input
                  accept="image/png,image/jpeg"
                  aria-invalid={fieldState.invalid}
                  id={name}
                  name={name}
                  onBlur={onBlur}
                  onChange={(event) => onChange(event.target.files?.[0])}
                  ref={ref}
                  type="file"
                />
                <FieldDescription>
                  Gunakan screenshot halaman Nilai USEPT dari SIMAK yang
                  menampilkan nama, NIM, tanggal ujian, skor, dan status lulus.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ) : (
          <Controller
            control={form.control}
            name="tempatTanggal"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Tempat, Tanggal</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  id={field.name}
                  placeholder="Contoh: Palembang, 29 Mei 2026"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}
      </FieldGroup>

      <Button disabled={form.formState.isSubmitting} type="submit">
        <Download className="size-4" />
        Unduh DOCX
      </Button>
    </form>
  );
}
