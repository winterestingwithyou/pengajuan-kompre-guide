import { z } from "zod";

export const suratPernyataanBebasPlagiatSchema = z.object({
  nama: z.string().min(3, "Nama lengkap wajib diisi."),
  nim: z.string().min(5, "NIM wajib diisi."),
  programStudi: z.string().min(2, "Program studi wajib diisi."),
  judulTugasAkhir: z.string().min(10, "Judul tugas akhir wajib diisi."),
  tempatTanggal: z.string().min(3, "Tempat dan tanggal wajib diisi."),
});

export type SuratPernyataanBebasPlagiatValues = z.infer<
  typeof suratPernyataanBebasPlagiatSchema
>;
