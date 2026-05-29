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
import { generateSuratPernyataanBebasPlagiat } from "~/features/letters/templates/generate-surat-pernyataan-bebas-plagiat";
import { generateSuratPemutakhiranData } from "~/features/letters/templates/generate-surat-pemutakhiran-data";

type GeneratorValues = {
  nama: string;
  nim: string;
  programStudi: string;
  judulTugasAkhir: string;
  tempatTanggal: string;
};

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function LetterGeneratorForm({
  template,
}: {
  template: LetterTemplate;
}) {
  const isPlagiarismLetter =
    template.id === "surat-pernyataan-bebas-plagiat";
  const schema = isPlagiarismLetter
    ? suratPernyataanBebasPlagiatSchema
    : suratPemutakhiranDataSchema;

  const form = useForm<GeneratorValues>({
    defaultValues: {
      nama: "",
      nim: "",
      programStudi: "D3 Manajemen Informatika Universitas Sriwijaya",
      judulTugasAkhir: "",
      tempatTanggal: "",
    },
    resolver: zodResolver(schema) as unknown as Resolver<GeneratorValues>,
  });

  async function onSubmit(values: GeneratorValues) {
    const blob = isPlagiarismLetter
      ? await generateSuratPernyataanBebasPlagiat(values)
      : await generateSuratPemutakhiranData(values);

    downloadBlob(blob, template.outputFileName);
    toast.success("File surat berhasil dibuat.");
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Alert>
        <AlertTitle>Generator awal</AlertTitle>
        <AlertDescription>
          Format dokumen ini masih placeholder. Periksa ulang isi, tanda tangan,
          materai, dan ketentuan final sebelum digunakan untuk pengajuan.
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
      </FieldGroup>

      <Button disabled={form.formState.isSubmitting} type="submit">
        <Download className="size-4" />
        Unduh DOCX
      </Button>
    </form>
  );
}
