import { z } from "zod";

const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

export const validasiUseptSchema = z.object({
  nama: z.string().min(3, "Nama lengkap wajib diisi."),
  nim: z.string().min(5, "NIM wajib diisi."),
  screenshotUsept: z
    .custom<File>((value) => value instanceof File, {
      message: "Screenshot USEPT wajib dipilih.",
    })
    .refine((file) => allowedImageTypes.includes(file.type), {
      message: "Screenshot harus berupa gambar PNG atau JPG.",
    }),
});

export type ValidasiUseptValues = z.infer<typeof validasiUseptSchema>;
