import { z } from "zod";

export const suratPemutakhiranDataSchema = z.object({
  nama: z.string().min(3, "Nama lengkap wajib diisi."),
  nim: z.string().min(5, "NIM wajib diisi."),
  programStudi: z.string().min(2, "Program studi wajib diisi."),
  tempatTanggal: z.string().min(3, "Tempat dan tanggal wajib diisi."),
});

export type SuratPemutakhiranDataValues = z.infer<
  typeof suratPemutakhiranDataSchema
>;
