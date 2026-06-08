import { z } from "zod";

export const suratPernyataanBebasPlagiatSchema = z.object({
  nama: z.string().min(3, "Nama lengkap wajib diisi."),
  nim: z.string().min(5, "NIM wajib diisi."),
  hariTanggal: z.string().optional(),
  bulan: z.string().min(3, "Bulan wajib diisi."),
  tahun: z.string().regex(/^\d{4}$/, "Tahun harus 4 digit."),
});

export type SuratPernyataanBebasPlagiatValues = z.infer<
  typeof suratPernyataanBebasPlagiatSchema
>;
