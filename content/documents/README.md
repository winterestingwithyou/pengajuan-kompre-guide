# Document How-To Content

Folder ini berisi konten panduan untuk setiap surat/dokumen yang dibutuhkan pada halaman panduan pengajuan kompre.

## Aturan

1. Satu file markdown untuk satu dokumen.
2. Jangan menggabungkan banyak dokumen dalam satu file.
3. Gunakan frontmatter untuk metadata.
4. Gunakan heading: Kegunaan, Cara Mendapatkan, Link Terkait, Ketentuan File, Catatan.
5. Jika informasi belum lengkap, isi status dengan `draft`.
6. Tulis link lengkap dengan `https://` agar mudah dipindahkan ke data aplikasi.
7. Setelah markdown diperbarui, sinkronkan juga isi yang tampil di `app/features/requirements/data/kompre-requirements.ts`.

## Status

- `todo`: panduan belum tersedia.
- `draft`: panduan sudah ada, tetapi masih perlu dikonfirmasi atau dilengkapi.
- `ready`: panduan sudah cukup jelas untuk digunakan.

Jika ragu, gunakan `draft` dan jelaskan bagian yang belum pasti di bagian Catatan.
