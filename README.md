# Panduan Pengajuan Kompre

Web app panduan pengajuan komprehensif untuk mahasiswa D3 Manajemen Informatika Universitas Sriwijaya.

A project by [@winterestingwithyou](https://github.com/winterestingwithyou).

Aplikasi ini membantu mahasiswa memahami dokumen yang dibutuhkan, mengecek kesiapan dokumen, menyimpan link lokasi file secara lokal, dan membuat beberapa surat yang dapat digenerate mandiri sebelum melanjutkan ke Google Form resmi pengajuan kompre.

> Aplikasi ini bukan pengganti Google Form resmi. Data checklist tersimpan lokal di browser pengguna dan tidak dikirim ke server.

## Fitur

- Panduan dokumen pengajuan kompre berdasarkan kategori.
- Pencarian dan filter dokumen.
- Checklist kesiapan dokumen dengan progress.
- Penyimpanan link file dokumen di IndexedDB browser.
- Generator DOCX client-side untuk dokumen tertentu.
- Link menuju Google Form resmi dan referensi dokumen.
- UI responsive dengan dukungan dark mode.
- Beberapa halaman diprerender untuk membantu SEO.

## Tech Stack

- React Router v7 Framework Mode
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Dexie dan dexie-react-hooks
- docx
- lucide-react
- Bun sebagai package manager

## Mulai Development

Pastikan Bun sudah terpasang:

```bash
bun --version
```

Install dependencies:

```bash
bun install
```

Jalankan development server:

```bash
bun run dev
```

Aplikasi akan tersedia di:

```txt
http://localhost:5173
```

## Script

```bash
bun run dev
bun run typecheck
bun run build
bun run start
```

Gunakan `bun run typecheck` sebelum mengirim perubahan. Untuk perubahan yang menyentuh routing, generator, atau konfigurasi build, jalankan juga `bun run build`.

## Struktur Project

```txt
app/
  components/
    layout/
    ui/
  features/
    checklist/
    letters/
    requirements/
  lib/
  routes/

content/
  documents/

public/
```

Bagian penting:

- `app/features/requirements/data/kompre-requirements.ts`: data utama semua kebutuhan dokumen kompre.
- `content/documents/`: sumber catatan panduan berbentuk markdown.
- `app/features/letters/`: schema, data template, form, dan generator surat DOCX.
- `app/lib/db.ts`: konfigurasi IndexedDB untuk checklist lokal.
- `react-router.config.ts`: konfigurasi React Router dan prerender route.

## Kontribusi

Project ini dibuat open source agar mahasiswa lain bisa membantu memperbaiki panduan, melengkapi informasi, dan meningkatkan pengalaman penggunaan.

Baca panduan kontribusi lengkap di [CONTRIBUTING.md](CONTRIBUTING.md).

Kontribusi yang sangat membantu:

- Memperbaiki langkah panduan dokumen yang masih `draft`.
- Menambahkan link referensi resmi atau lokasi form yang valid.
- Memperbaiki typo, bahasa, atau istilah yang membingungkan.
- Menguji generator surat dan membandingkan hasil DOCX dengan format resmi.
- Memperbaiki bug UI, aksesibilitas, mobile layout, atau dark mode.

## Prinsip Data dan Privasi

- Tidak ada login.
- Tidak ada database eksternal.
- Tidak ada upload file ke aplikasi.
- Checklist dan link file dokumen hanya disimpan di browser pengguna memakai IndexedDB.
- Generator surat berjalan di browser dan hasilnya langsung diunduh oleh pengguna.

## Status Panduan

Setiap dokumen memiliki status panduan:

- `todo`: panduan belum tersedia.
- `draft`: panduan sudah ada, tetapi masih perlu dikonfirmasi atau dilengkapi.
- `ready`: panduan cukup siap digunakan.

Jika kamu belum yakin dengan sebuah informasi, gunakan status `draft` dan jelaskan bagian yang belum pasti di `notes`.

## Lisensi

Project ini dirilis dengan lisensi [MIT](LICENSE).

Copyright (c) 2026 [winterestingwithyou](https://github.com/winterestingwithyou).
