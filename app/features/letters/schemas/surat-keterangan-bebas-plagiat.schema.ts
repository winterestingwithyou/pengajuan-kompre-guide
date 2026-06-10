import { z } from "zod";

const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

function screenshotField(label: string) {
  return z
    .custom<File>((value) => value instanceof File, {
      message: `${label} wajib dipilih.`,
    })
    .refine((file) => allowedImageTypes.includes(file.type), {
      message: `${label} harus berupa gambar PNG atau JPG.`,
    });
}

export const suratKeteranganBebasPlagiatSchema = z.object({
  nama: z.string().min(3, "Nama lengkap wajib diisi."),
  nim: z.string().min(5, "NIM wajib diisi."),
  screenshotTurnitinIdentitas: screenshotField(
    "Screenshot halaman identitas Turnitin"
  ),
  screenshotTurnitinSimilarity: screenshotField(
    "Screenshot halaman similarity Turnitin"
  ),
});

export type SuratKeteranganBebasPlagiatValues = z.infer<
  typeof suratKeteranganBebasPlagiatSchema
>;
