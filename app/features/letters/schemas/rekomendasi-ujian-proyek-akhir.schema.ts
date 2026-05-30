import { z } from "zod";

function hasAcademicTitle(value: string) {
  return /(?:,\s*[^,]*\.)|(?:\b(?:Dr|Prof|Ir|S|M|Ph)\.)/i.test(value);
}

export const rekomendasiUjianProyekAkhirSchema = z.object({
  nama: z.string().min(3, "Nama lengkap wajib diisi."),
  nim: z.string().min(5, "NIM wajib diisi."),
  judulTugasAkhir: z.string().min(10, "Judul tugas akhir wajib diisi."),
  namaPembimbing1: z
    .string()
    .min(3, "Nama pembimbing I wajib diisi.")
    .refine(hasAcademicTitle, "Nama pembimbing I harus menyertakan gelar."),
  nipPembimbing1: z.string().min(8, "NIP pembimbing I wajib diisi."),
  namaPembimbing2: z
    .string()
    .min(3, "Nama pembimbing II wajib diisi.")
    .refine(hasAcademicTitle, "Nama pembimbing II harus menyertakan gelar."),
  nipPembimbing2: z.string().min(8, "NIP pembimbing II wajib diisi."),
  hariTanggal: z.string().optional(),
  bulan: z.string().min(3, "Bulan wajib diisi."),
  tahun: z.string().regex(/^\d{4}$/, "Tahun harus 4 digit."),
});

export type RekomendasiUjianProyekAkhirValues = z.infer<
  typeof rekomendasiUjianProyekAkhirSchema
>;
