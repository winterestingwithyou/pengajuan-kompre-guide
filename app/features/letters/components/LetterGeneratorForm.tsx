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
import { lampiranPddiktiSchema } from "~/features/letters/schemas/lampiran-pddikti.schema";
import { rekomendasiUjianProyekAkhirSchema } from "~/features/letters/schemas/rekomendasi-ujian-proyek-akhir.schema";
import { suratKeteranganBebasPlagiatSchema } from "~/features/letters/schemas/surat-keterangan-bebas-plagiat.schema";
import { suratPernyataanBebasPlagiatSchema } from "~/features/letters/schemas/surat-pernyataan-bebas-plagiat.schema";
import { suratPemutakhiranDataSchema } from "~/features/letters/schemas/surat-pemutakhiran-data.schema";
import { validasiUseptSchema } from "~/features/letters/schemas/validasi-usept.schema";
import { generateKartuKonsultasiTugasAkhir } from "~/features/letters/templates/generate-kartu-konsultasi-tugas-akhir";
import { generateLampiranPddikti } from "~/features/letters/templates/generate-lampiran-pddikti";
import { generateRekomendasiUjianProyekAkhir } from "~/features/letters/templates/generate-rekomendasi-ujian-proyek-akhir";
import { generateSuratKeteranganBebasPlagiat } from "~/features/letters/templates/generate-surat-keterangan-bebas-plagiat";
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
  screenshotPddikti?: File;
  screenshotKonsultasi1?: File;
  screenshotKonsultasi2?: File;
  screenshotDataDiri?: File;
  screenshotAkademik?: File;
  screenshotAlamat?: File;
  screenshotOrangTua?: File;
  screenshotWali?: File;
  screenshotPerguruanTinggiAsal?: File;
  screenshotRiwayatPendidikan?: File;
  screenshotTurnitinIdentitas?: File;
  screenshotTurnitinSimilarity?: File;
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

const dataUpdateScreenshotFields = [
  ["screenshotDataDiri", "Screenshot Data Diri"],
  ["screenshotAkademik", "Screenshot Akademik"],
  ["screenshotAlamat", "Screenshot Alamat"],
  ["screenshotOrangTua", "Screenshot Orang Tua"],
  ["screenshotWali", "Screenshot Wali"],
  ["screenshotPerguruanTinggiAsal", "Screenshot Perguruan Tinggi Asal"],
  ["screenshotRiwayatPendidikan", "Screenshot Riwayat Pendidikan"],
] as const;

export function LetterGeneratorForm({
  template,
}: {
  template: LetterTemplate;
}) {
  const isPlagiarismLetter =
    template.id === "surat-pernyataan-bebas-plagiat";
  const isPlagiarismCertificate =
    template.id === "lampiran-hasil-cek-plagiat";
  const isUseptLetter = template.id === "validasi-usept";
  const isPddiktiAttachment = template.id === "lampiran-pddikti";
  const isDataUpdateLetter =
    template.id === "surat-pernyataan-pemutakhiran-data";
  const isRecommendationLetter =
    template.id === "rekomendasi-ujian-proyek-akhir";
  const isConsultationCard = template.id === "kartu-konsultasi-tugas-akhir";
  const usesAdvisorFields = isRecommendationLetter || isConsultationCard;
  const usesSplitDateFields =
    isRecommendationLetter ||
    isConsultationCard ||
    isPlagiarismLetter ||
    isDataUpdateLetter;
  const schema = isPlagiarismLetter
    ? suratPernyataanBebasPlagiatSchema
    : isPlagiarismCertificate
      ? suratKeteranganBebasPlagiatSchema
    : isPddiktiAttachment
      ? lampiranPddiktiSchema
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
      screenshotPddikti: undefined,
      screenshotKonsultasi1: undefined,
      screenshotKonsultasi2: undefined,
      screenshotDataDiri: undefined,
      screenshotAkademik: undefined,
      screenshotAlamat: undefined,
      screenshotOrangTua: undefined,
      screenshotWali: undefined,
      screenshotPerguruanTinggiAsal: undefined,
      screenshotRiwayatPendidikan: undefined,
      screenshotTurnitinIdentitas: undefined,
      screenshotTurnitinSimilarity: undefined,
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

    if (isPlagiarismCertificate) {
      if (
        !values.screenshotTurnitinIdentitas ||
        !values.screenshotTurnitinSimilarity
      ) {
        return;
      }

      const [
        identitasData,
        identitasSize,
        similarityData,
        similaritySize,
      ] = await Promise.all([
        values.screenshotTurnitinIdentitas.arrayBuffer(),
        getImageSize(values.screenshotTurnitinIdentitas),
        values.screenshotTurnitinSimilarity.arrayBuffer(),
        getImageSize(values.screenshotTurnitinSimilarity),
      ]);

      const blob = await generateSuratKeteranganBebasPlagiat({
        nama: values.nama,
        nim: values.nim,
        screenshots: {
          identitas: {
            data: identitasData,
            type: getImageType(values.screenshotTurnitinIdentitas),
            width: identitasSize.width,
            height: identitasSize.height,
          },
          similarity: {
            data: similarityData,
            type: getImageType(values.screenshotTurnitinSimilarity),
            width: similaritySize.width,
            height: similaritySize.height,
          },
        },
      });

      downloadBlob(blob, template.outputFileName);
      toast.success("File surat berhasil dibuat.");
      return;
    }

    if (isPddiktiAttachment) {
      if (!values.screenshotPddikti) {
        return;
      }

      const [screenshotData, imageSize] = await Promise.all([
        values.screenshotPddikti.arrayBuffer(),
        getImageSize(values.screenshotPddikti),
      ]);
      const blob = await generateLampiranPddikti({
        nama: values.nama,
        nim: values.nim,
        screenshot: {
          data: screenshotData,
          type: getImageType(values.screenshotPddikti),
          width: imageSize.width,
          height: imageSize.height,
        },
      });

      downloadBlob(blob, template.outputFileName);
      toast.success("File lampiran berhasil dibuat.");
      return;
    }

    if (isDataUpdateLetter) {
      const screenshotFiles = {
        dataDiri: values.screenshotDataDiri,
        akademik: values.screenshotAkademik,
        alamat: values.screenshotAlamat,
        orangTua: values.screenshotOrangTua,
        wali: values.screenshotWali,
        perguruanTinggiAsal: values.screenshotPerguruanTinggiAsal,
        riwayatPendidikan: values.screenshotRiwayatPendidikan,
      };

      if (
        !screenshotFiles.dataDiri ||
        !screenshotFiles.akademik ||
        !screenshotFiles.alamat ||
        !screenshotFiles.orangTua ||
        !screenshotFiles.wali ||
        !screenshotFiles.perguruanTinggiAsal ||
        !screenshotFiles.riwayatPendidikan
      ) {
        return;
      }

      const [
        dataDiriData,
        dataDiriSize,
        akademikData,
        akademikSize,
        alamatData,
        alamatSize,
        orangTuaData,
        orangTuaSize,
        waliData,
        waliSize,
        perguruanTinggiAsalData,
        perguruanTinggiAsalSize,
        riwayatPendidikanData,
        riwayatPendidikanSize,
      ] = await Promise.all([
        screenshotFiles.dataDiri.arrayBuffer(),
        getImageSize(screenshotFiles.dataDiri),
        screenshotFiles.akademik.arrayBuffer(),
        getImageSize(screenshotFiles.akademik),
        screenshotFiles.alamat.arrayBuffer(),
        getImageSize(screenshotFiles.alamat),
        screenshotFiles.orangTua.arrayBuffer(),
        getImageSize(screenshotFiles.orangTua),
        screenshotFiles.wali.arrayBuffer(),
        getImageSize(screenshotFiles.wali),
        screenshotFiles.perguruanTinggiAsal.arrayBuffer(),
        getImageSize(screenshotFiles.perguruanTinggiAsal),
        screenshotFiles.riwayatPendidikan.arrayBuffer(),
        getImageSize(screenshotFiles.riwayatPendidikan),
      ]);

      const blob = await generateSuratPemutakhiranData({
        nama: values.nama,
        nim: values.nim,
        hariTanggal: values.hariTanggal,
        bulan: values.bulan,
        tahun: values.tahun,
        screenshots: {
          dataDiri: {
            data: dataDiriData,
            type: getImageType(screenshotFiles.dataDiri),
            width: dataDiriSize.width,
            height: dataDiriSize.height,
          },
          akademik: {
            data: akademikData,
            type: getImageType(screenshotFiles.akademik),
            width: akademikSize.width,
            height: akademikSize.height,
          },
          alamat: {
            data: alamatData,
            type: getImageType(screenshotFiles.alamat),
            width: alamatSize.width,
            height: alamatSize.height,
          },
          orangTua: {
            data: orangTuaData,
            type: getImageType(screenshotFiles.orangTua),
            width: orangTuaSize.width,
            height: orangTuaSize.height,
          },
          wali: {
            data: waliData,
            type: getImageType(screenshotFiles.wali),
            width: waliSize.width,
            height: waliSize.height,
          },
          perguruanTinggiAsal: {
            data: perguruanTinggiAsalData,
            type: getImageType(screenshotFiles.perguruanTinggiAsal),
            width: perguruanTinggiAsalSize.width,
            height: perguruanTinggiAsalSize.height,
          },
          riwayatPendidikan: {
            data: riwayatPendidikanData,
            type: getImageType(screenshotFiles.riwayatPendidikan),
            width: riwayatPendidikanSize.width,
            height: riwayatPendidikanSize.height,
          },
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

    if (isPlagiarismLetter) {
      const blob = await generateSuratPernyataanBebasPlagiat({
        nama: values.nama,
        nim: values.nim,
        hariTanggal: values.hariTanggal,
        bulan: values.bulan,
        tahun: values.tahun,
      });
      downloadBlob(blob, template.outputFileName);
      toast.success("File surat berhasil dibuat.");
    }

    return;
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Alert>
        <AlertTitle>
          {isUseptLetter
            ? "Generator Surat Validasi USEPT"
            : isPlagiarismCertificate
              ? "Generator Lampiran Hasil Cek Plagiat"
            : isConsultationCard
              ? "Generator Kartu Konsultasi Tugas Akhir"
            : isPddiktiAttachment
              ? "Generator Lampiran PDDIKTI"
            : isDataUpdateLetter
              ? "Generator Surat Pemutakhiran Data"
            : isRecommendationLetter
              ? "Generator Surat Rekomendasi Ujian Proyek Akhir"
            : isPlagiarismLetter
              ? "Generator Surat Pernyataan Bebas Plagiat"
              : "Generator awal"}
        </AlertTitle>
        <AlertDescription>
          {isUseptLetter
            ? "Screenshot USEPT hanya dibaca di browser untuk dimasukkan ke DOCX. Setelah diunduh, cetak surat dan minta validasi admin program studi serta koordinator program studi."
            : isPlagiarismCertificate
              ? "Generator ini membuat Lampiran Hasil Cek Plagiat dari dua halaman Turnitin: halaman identitas/judul TA dan halaman persentase similarity keseluruhan. Setelah dicetak, lampiran perlu ditandatangani admin program studi dan koordinator program studi."
            : isConsultationCard
              ? "Generator ini membuat dua halaman kartu konsultasi untuk Pembimbing I dan Pembimbing II. Screenshot asistensi hanya dibaca di browser untuk dimasukkan ke DOCX."
            : isPddiktiAttachment
              ? "Generator ini membuat lampiran PDDIKTI dari nama, NIM, dan screenshot data PDDIKTI. Dokumen tidak perlu divalidasi, dicetak, atau ditandatangani; cukup ubah hasil DOCX ke PDF sebelum dikumpulkan."
            : isDataUpdateLetter
              ? "Generator ini membuat surat pemutakhiran data beserta 7 screenshot menu Biodata SIMAK. Setelah diunduh, rapikan kembali dokumen jika perlu, cetak, tanda tangani pribadi tanpa materai, lalu scan menjadi PDF."
            : isRecommendationLetter
              ? "Generator ini membuat dua halaman surat untuk Pembimbing I dan Pembimbing II. Pastikan nama dosen pembimbing sudah menyertakan gelar."
            : isPlagiarismLetter
              ? "Program studi otomatis Manajemen Informatika dan tempat surat otomatis Palembang. Setelah diunduh, cetak surat, beri materai 10.000, tanda tangan, dan tempel pasfoto warna 4x6."
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

        {!isUseptLetter &&
          !isPddiktiAttachment &&
          !isDataUpdateLetter &&
          !usesAdvisorFields &&
          !isPlagiarismCertificate &&
          !isPlagiarismLetter && (
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

          </>
        )}

        {usesSplitDateFields && (
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
        )}

        {isDataUpdateLetter && (
          <div className="grid gap-4 sm:grid-cols-2">
            {dataUpdateScreenshotFields.map(([name, label]) => (
              <Controller
                control={form.control}
                key={name}
                name={name}
                render={({
                  field: { name, onBlur, onChange, ref },
                  fieldState,
                }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>
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
                      Gunakan screenshot menu Biodata SIMAK bagian{" "}
                      {label.replace("Screenshot ", "")}.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </div>
        )}

        {isPlagiarismCertificate && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              control={form.control}
              name="screenshotTurnitinIdentitas"
              render={({ field: { name, onBlur, onChange, ref }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={name}>
                    Screenshot Halaman Identitas Turnitin
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
                    Gunakan halaman pertama PDF Turnitin dari perpustakaan yang
                    menampilkan nama mahasiswa dan judul TA.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="screenshotTurnitinSimilarity"
              render={({ field: { name, onBlur, onChange, ref }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={name}>
                    Screenshot Halaman Similarity Turnitin
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
                    Gunakan halaman kedua atau halaman yang menampilkan
                    persentase similarity keseluruhan.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
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
        ) : isPddiktiAttachment ? (
          <Controller
            control={form.control}
            name="screenshotPddikti"
            render={({ field: { name, onBlur, onChange, ref }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={name}>Screenshot PDDIKTI</FieldLabel>
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
                  Gunakan screenshot halaman PDDIKTI yang menampilkan data
                  mahasiswa dengan jelas.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ) : !usesSplitDateFields && !isPlagiarismCertificate ? (
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
