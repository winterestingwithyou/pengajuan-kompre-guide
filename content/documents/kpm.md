---
id: kpm
title: Kartu Pengenal Mahasiswa (KPM)
category: identitas
required: false
status: ready
sourceLabel: Mahasiswa
acceptedFileType: image
maxFileSizeMb: 1
maxFileCount: 1
externalLink: "https://www.iloveimg.com/compress-image/compress-jpg"
order: 1
---

# Kartu Pengenal Mahasiswa (KPM)

## Ringkasan

Kartu Pengenal Mahasiswa (KPM) adalah kartu identitas mahasiswa yang digunakan sebagai bukti status mahasiswa. Untuk persyaratan pengajuan kompre, dokumen ini cukup disiapkan dalam bentuk foto kartu KPM fisik milik mahasiswa.

## Kegunaan

KPM digunakan sebagai dokumen identitas mahasiswa. Foto KPM membantu pihak terkait memastikan bahwa pengaju adalah mahasiswa yang sesuai dengan data akademik.

## Bentuk Dokumen yang Dibutuhkan

Dokumen yang diunggah berupa **foto KPM fisik** dalam format gambar.

Ketentuan dokumen:

1. Format file berupa gambar, seperti JPG, JPEG, atau PNG.
2. Foto menampilkan bagian depan KPM dengan jelas.
3. Seluruh bagian kartu terlihat utuh dan tidak terpotong.
4. Informasi pada kartu masih dapat dibaca.
5. Ukuran file maksimal **1 MB**.
6. Jumlah file maksimal **1 file**.

## Cara Mendapatkan

Dokumen ini sangat mudah disiapkan karena mahasiswa hanya perlu memfoto KPM fisik milik sendiri.

Langkah-langkah:

1. Siapkan KPM fisik milik Anda.
2. Letakkan KPM di tempat yang datar dan memiliki pencahayaan cukup.
3. Foto bagian depan KPM dengan kamera ponsel.
4. Pastikan seluruh bagian kartu terlihat jelas dan tidak blur.
5. Periksa ukuran file foto.
6. Jika ukuran file lebih dari 1 MB, kompres foto terlebih dahulu.
7. Simpan foto yang sudah sesuai untuk diunggah pada Google Form pengajuan kompre.

## Link Terkait

- Kompres gambar: https://www.iloveimg.com/compress-image/compress-jpg

## Catatan Penting

- Jangan mengunggah foto yang buram, terlalu gelap, atau terpotong.
- Pastikan ukuran file sudah di bawah 1 MB sebelum diunggah.
- Jika hasil foto terlalu besar, gunakan layanan kompres gambar seperti iLoveIMG.
- Hindari mengubah isi data pada kartu. Cukup ambil foto kartu asli milik sendiri.
- Simpan file dengan nama yang mudah dikenali, misalnya `kpm-nama-mahasiswa.jpg`.

## Saran Tampilan di Modal / Dialog

Gunakan konten ini sebagai isi modal bantuan untuk dokumen KPM.

Saran struktur UI:

1. Judul: `Kartu Pengenal Mahasiswa (KPM)`
2. Deskripsi singkat: `Foto kartu identitas mahasiswa sebagai bukti status mahasiswa.`
3. Badge: `Image`, `Maks. 1 MB`, `1 File`
4. Section: `Cara Mendapatkan`
5. Section: `Ketentuan File`
6. Tombol eksternal: `Kompres Foto di iLoveIMG`
7. Catatan penting di bagian bawah modal.

## Update yang Diharapkan pada Data Requirement

Perbarui item requirement dengan `id: "kpm"` agar tidak lagi memakai placeholder.

Contoh update pada `kompreRequirements`:

```ts
{
  id: "kpm",
  title: "Kartu Pengenal Mahasiswa (KPM)",
  category: "identitas",
  description:
    "Kartu identitas mahasiswa yang digunakan sebagai bukti status mahasiswa.",
  sourceLabel: "Mahasiswa",
  acceptedFileType: "image",
  maxFileSizeMb: 1,
  maxFileCount: 1,
  isRequired: false,
  canGenerate: false,
  guideStatus: "ready",
  externalLink: "https://www.iloveimg.com/compress-image/compress-jpg",
  howToGet: [
    "Siapkan KPM fisik milik Anda.",
    "Foto bagian depan KPM dengan jelas menggunakan kamera ponsel.",
    "Pastikan seluruh bagian kartu terlihat utuh, tidak blur, dan informasinya dapat dibaca.",
    "Simpan foto dalam format JPG, JPEG, atau PNG.",
    "Pastikan ukuran file di bawah 1 MB sebelum diunggah.",
    "Jika ukuran file lebih dari 1 MB, kompres foto terlebih dahulu menggunakan layanan kompres gambar."
  ],
  notes: [
    "Dokumen yang dibutuhkan hanya berupa foto KPM fisik milik mahasiswa.",
    "Ukuran file maksimal 1 MB.",
    "Gunakan layanan kompres gambar jika ukuran foto terlalu besar.",
    "Pastikan foto tidak buram, tidak terlalu gelap, dan tidak terpotong."
  ],
}
```

## Scope untuk Agent

Saat mengerjakan enhancement KPM, lakukan hanya perubahan berikut:

1. Tambahkan file ini sebagai `content/documents/kpm.md` atau lokasi markdown dokumen yang digunakan project.
2. Perbarui data requirement `kpm` pada `kompreRequirements`.
3. Ubah `guideStatus` dari `todo` menjadi `ready`.
4. Tambahkan link kompres gambar ke `externalLink` atau field link terkait yang tersedia.
5. Pastikan modal/detail panduan dapat menampilkan langkah, link, dan catatan KPM.
6. Jangan mengubah dokumen persyaratan lain.

## Acceptance Criteria

Enhancement KPM dianggap selesai jika:

1. Panduan KPM tidak lagi menampilkan placeholder.
2. Halaman panduan menampilkan langkah cara menyiapkan foto KPM.
3. Pengguna mengetahui bahwa dokumen cukup berupa foto KPM fisik.
4. Pengguna mengetahui batas ukuran file maksimal 1 MB.
5. Pengguna mendapatkan link untuk kompres foto jika ukuran file terlalu besar.
6. Checklist tetap hanya menyimpan status dan link file pengguna secara lokal.
7. Tidak ada fitur upload file custom ke aplikasi.
