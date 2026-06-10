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

export const suratPemutakhiranDataSchema = z.object({
  nama: z.string().min(3, "Nama lengkap wajib diisi."),
  nim: z.string().min(5, "NIM wajib diisi."),
  screenshotDataDiri: screenshotField("Screenshot Data Diri"),
  screenshotAkademik: screenshotField("Screenshot Akademik"),
  screenshotAlamat: screenshotField("Screenshot Alamat"),
  screenshotOrangTua: screenshotField("Screenshot Orang Tua"),
  screenshotWali: screenshotField("Screenshot Wali"),
  screenshotPerguruanTinggiAsal: screenshotField(
    "Screenshot Perguruan Tinggi Asal"
  ),
  screenshotRiwayatPendidikan: screenshotField(
    "Screenshot Riwayat Pendidikan"
  ),
  hariTanggal: z.string().optional(),
  bulan: z.string().min(3, "Bulan wajib diisi."),
  tahun: z.string().regex(/^\d{4}$/, "Tahun harus 4 digit."),
});

export type SuratPemutakhiranDataValues = z.infer<
  typeof suratPemutakhiranDataSchema
>;
