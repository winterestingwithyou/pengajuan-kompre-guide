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
import { kartuKonsultasiTugasAkhirSchema } from "~/features/letters/schemas/kartu-konsultasi-tugas-akhir.schema";
import { rekomendasiUjianProyekAkhirSchema } from "~/features/letters/schemas/rekomendasi-ujian-proyek-akhir.schema";
import { suratPernyataanBebasPlagiatSchema } from "~/features/letters/schemas/surat-pernyataan-bebas-plagiat.schema";
import { suratPemutakhiranDataSchema } from "~/features/letters/schemas/surat-pemutakhiran-data.schema";
import { validasiUseptSchema } from "~/features/letters/schemas/validasi-usept.schema";
import { generateKartuKonsultasiTugasAkhir } from "~/features/letters/templates/generate-kartu-konsultasi-tugas-akhir";
import { generateRekomendasiUjianProyekAkhir } from "~/features/letters/templates/generate-rekomendasi-ujian-proyek-akhir";
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
  screenshotKonsultasi1?: File;
  screenshotKonsultasi2?: File;
  namaPembimbing1: string;
  nipPembimbing1: string;
  namaPembimbing2: string;
  nipPembimbing2: string;
  hariTanggal: string;
  bulan: string;
  tahun: string;
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
  const isRecommendationLetter =
    template.id === "rekomendasi-ujian-proyek-akhir";
  const isConsultationCard = template.id === "kartu-konsultasi-tugas-akhir";
  const usesAdvisorFields = isRecommendationLetter || isConsultationCard;
  const schema = isPlagiarismLetter
    ? suratPernyataanBebasPlagiatSchema
    : isConsultationCard
      ? kartuKonsultasiTugasAkhirSchema
    : isRecommendationLetter
      ? rekomendasiUjianProyekAkhirSchema
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
      screenshotKonsultasi1: undefined,
      screenshotKonsultasi2: undefined,
      namaPembimbing1: "",
      nipPembimbing1: "",
      namaPembimbing2: "",
      nipPembimbing2: "",
      hariTanggal: "",
      bulan: "",
      tahun: new Date().getFullYear().toString(),
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

    if (isConsultationCard) {
      if (!values.screenshotKonsultasi1 || !values.screenshotKonsultasi2) {
        return;
      }

      const [
        screenshotData1,
        screenshotSize1,
        screenshotData2,
        screenshotSize2,
      ] = await Promise.all([
        values.screenshotKonsultasi1.arrayBuffer(),
        getImageSize(values.screenshotKonsultasi1),
        values.screenshotKonsultasi2.arrayBuffer(),
        getImageSize(values.screenshotKonsultasi2),
      ]);
      const blob = await generateKartuKonsultasiTugasAkhir({
        nama: values.nama,
        nim: values.nim,
        judulTugasAkhir: values.judulTugasAkhir,
        namaPembimbing1: values.namaPembimbing1,
        nipPembimbing1: values.nipPembimbing1,
        screenshotKonsultasi1: {
          data: screenshotData1,
          type: getImageType(values.screenshotKonsultasi1),
          width: screenshotSize1.width,
          height: screenshotSize1.height,
        },
        namaPembimbing2: values.namaPembimbing2,
        nipPembimbing2: values.nipPembimbing2,
        screenshotKonsultasi2: {
          data: screenshotData2,
          type: getImageType(values.screenshotKonsultasi2),
          width: screenshotSize2.width,
          height: screenshotSize2.height,
        },
        hariTanggal: values.hariTanggal,
        bulan: values.bulan,
        tahun: values.tahun,
      });

      downloadBlob(blob, template.outputFileName);
      toast.success("File surat berhasil dibuat.");
      return;
    }

    if (isRecommendationLetter) {
      const blob = await generateRekomendasiUjianProyekAkhir({
        nama: values.nama,
        nim: values.nim,
        judulTugasAkhir: values.judulTugasAkhir,
        namaPembimbing1: values.namaPembimbing1,
        nipPembimbing1: values.nipPembimbing1,
        namaPembimbing2: values.namaPembimbing2,
        nipPembimbing2: values.nipPembimbing2,
        hariTanggal: values.hariTanggal,
        bulan: values.bulan,
        tahun: values.tahun,
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
          {isUseptLetter
            ? "Generator Surat Validasi USEPT"
            : isConsultationCard
              ? "Generator Kartu Konsultasi Tugas Akhir"
            : isRecommendationLetter
              ? "Generator Surat Rekomendasi Ujian Proyek Akhir"
              : "Generator awal"}
        </AlertTitle>
        <AlertDescription>
          {isUseptLetter
            ? "Screenshot USEPT hanya dibaca di browser untuk dimasukkan ke DOCX. Setelah diunduh, cetak surat dan minta validasi admin program studi serta koordinator program studi."
            : isConsultationCard
              ? "Generator ini membuat dua halaman kartu konsultasi untuk Pembimbing I dan Pembimbing II. Screenshot asistensi hanya dibaca di browser untuk dimasukkan ke DOCX."
            : isRecommendationLetter
              ? "Generator ini membuat dua halaman surat untuk Pembimbing I dan Pembimbing II. Pastikan nama dosen pembimbing sudah menyertakan gelar."
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

        {!isUseptLetter && !usesAdvisorFields && (
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

        {usesAdvisorFields && (
          <>
            <Controller
              control={form.control}
              name="judulTugasAkhir"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Judul Tugas Akhir</FieldLabel>
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

            <Controller
              control={form.control}
              name="namaPembimbing1"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nama Pembimbing I</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                    placeholder="Contoh: Nama Dosen Pembimbing, M.Kom."
                  />
                  <FieldDescription>
                    Wajib menyertakan gelar dosen pembimbing.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="nipPembimbing1"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>NIP Pembimbing I</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                    placeholder="Masukkan NIP pembimbing I"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {isConsultationCard && (
              <Controller
                control={form.control}
                name="screenshotKonsultasi1"
                render={({
                  field: { name, onBlur, onChange, ref },
                  fieldState,
                }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>
                      Screenshot Asistensi Pembimbing I
                    </FieldLabel>
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
                      Gunakan screenshot daftar asistensi SIMAK khusus
                      Pembimbing I yang sudah disetujui.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}

            <Controller
              control={form.control}
              name="namaPembimbing2"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Nama Pembimbing II</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                    placeholder="Contoh: Nama Dosen Pembimbing, M.Kom."
                  />
                  <FieldDescription>
                    Wajib menyertakan gelar dosen pembimbing.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="nipPembimbing2"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>NIP Pembimbing II</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                    placeholder="Masukkan NIP pembimbing II"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {isConsultationCard && (
              <Controller
                control={form.control}
                name="screenshotKonsultasi2"
                render={({
                  field: { name, onBlur, onChange, ref },
                  fieldState,
                }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>
                      Screenshot Asistensi Pembimbing II
                    </FieldLabel>
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
                      Gunakan screenshot daftar asistensi SIMAK khusus
                      Pembimbing II yang sudah disetujui.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <Controller
                control={form.control}
                name="hariTanggal"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Hari/Tanggal</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                      placeholder="Opsional"
                    />
                    <FieldDescription>
                      Boleh dikosongkan untuk diisi manual.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="bulan"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Bulan</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                      placeholder="Mei"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="tahun"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Tahun</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                      placeholder="2026"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </>
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
        ) : !usesAdvisorFields ? (
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
        ) : null}
      </FieldGroup>

      <Button disabled={form.formState.isSubmitting} type="submit">
        <Download className="size-4" />
        Unduh DOCX
      </Button>
    </form>
  );
}
