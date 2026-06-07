# Panduan Kontribusi

Terima kasih sudah ingin membantu project Panduan Pengajuan Kompre. Project ini dibuat agar mahasiswa D3 Manajemen Informatika Universitas Sriwijaya bisa menyiapkan dokumen kompre dengan lebih jelas dan terarah.

Kontribusi kecil seperti memperbaiki typo, memperjelas langkah panduan, atau menguji link sangat berarti.

## Cara Mulai

Package manager project ini adalah **Bun**. Jangan menggunakan `npm`, `pnpm`, atau `yarn` untuk mengubah lockfile atau menjalankan workflow utama project.

```bash
bun install
bun run dev
```

Sebelum mengirim perubahan:

```bash
bun run typecheck
```

Untuk perubahan yang menyentuh route, generator surat, konfigurasi React Router, atau build output:

```bash
bun run build
```

## Jenis Kontribusi

Kamu bisa membantu melalui:

- Melengkapi panduan dokumen yang masih `todo` atau `draft`.
- Mengoreksi langkah panduan yang sudah tidak sesuai kondisi terbaru.
- Menambahkan link referensi resmi, form, spreadsheet, atau folder dokumen yang valid.
- Memperbaiki typo, susunan kalimat, dan istilah agar lebih mudah dipahami mahasiswa.
- Memperbaiki UI mobile, dark mode, aksesibilitas, atau bug visual.
- Menguji generator DOCX dan membandingkan hasilnya dengan format resmi.
- Menyederhanakan kode tanpa mengubah perilaku pengguna.

## Alur Kontribusi

1. Fork repository.
2. Buat branch baru dari branch utama.
3. Jalankan `bun install`.
4. Jalankan `bun run dev` dan buka aplikasi lokal.
5. Lakukan perubahan dengan scope yang jelas.
6. Jalankan `bun run typecheck`.
7. Jalankan `bun run build` jika perubahan berisiko memengaruhi build.
8. Buat pull request dengan deskripsi perubahan dan cara verifikasi.

Contoh nama branch:

```txt
docs/update-bebas-pustaka
fix/mobile-nav-spacing
feat/generator-validasi-usept
```

## Struktur Penting

```txt
app/features/requirements/data/kompre-requirements.ts
content/documents/
app/features/requirements/components/
app/features/checklist/
app/features/letters/
app/routes/
```

Gunakan `content/documents/` untuk menulis sumber panduan berbentuk markdown. Setelah itu, update data yang tampil di aplikasi pada `app/features/requirements/data/kompre-requirements.ts`.

## Mengubah Panduan Dokumen

Panduan dokumen biasanya perlu diperbarui di dua tempat:

1. File markdown di `content/documents/`.
2. Data statis di `app/features/requirements/data/kompre-requirements.ts`.

File markdown membantu menjaga catatan sumber panduan agar mudah dibaca dan direview. Data TypeScript dipakai langsung oleh aplikasi.

Saat memperbarui dokumen, pastikan:

- `id` sesuai dengan id requirement di `kompre-requirements.ts`.
- `title` sama atau tetap merepresentasikan nama dokumen pada form kompre.
- `acceptedFileType`, `maxFileSizeMb`, dan `maxFileCount` sesuai ketentuan.
- `howToGet` berisi langkah yang praktis dan berurutan.
- `notes` berisi peringatan, ketidakpastian, atau hal penting yang mudah terlewat.
- Link ditulis lengkap dengan `https://` agar bisa dibuat clickable oleh UI.
- Gunakan `externalLinks` jika dokumen punya link referensi, form, spreadsheet, folder, atau halaman sistem yang perlu tampil sebagai tombol.

Contoh `externalLinks`:

```ts
externalLinks: [
  {
    label: "Login OLS Fasilkom UNSRI",
    url: "https://ols.ilkom.unsri.ac.id/login",
  },
  {
    label: "Registrasi OLS Fasilkom UNSRI",
    url: "https://ols.ilkom.unsri.ac.id/umum/register",
  },
],
```

## Status Panduan

Gunakan status berikut:

- `todo`: panduan belum tersedia atau belum bisa ditulis dengan aman.
- `draft`: panduan sudah punya langkah awal, tetapi masih ada informasi yang perlu dikonfirmasi.
- `ready`: panduan sudah cukup jelas, dapat diikuti, dan tidak ada ketidakpastian besar.

Jika ragu, pilih `draft`. Jangan memaksa status `ready` untuk panduan yang belum terverifikasi.

Contoh alasan status `draft`:

- Link form belum diketahui.
- Format surat resmi belum tersedia.
- Alur tanda tangan atau validasi masih berubah-ubah.
- Informasi berasal dari pengalaman mahasiswa dan belum dikonfirmasi admin.

## Menambahkan atau Mengubah Generator Surat

Generator surat harus berjalan client-side dan menghasilkan file `.docx`.

Lokasi umum:

```txt
app/features/letters/data/letter-templates.ts
app/features/letters/schemas/
app/features/letters/templates/
app/features/letters/components/LetterGeneratorForm.tsx
```

Aturan penting:

- Gunakan `docx`.
- Gunakan `zod` untuk validasi input.
- Gunakan React Hook Form dengan komponen shadcn `Field`, bukan pola lama shadcn `Form`.
- Jangan mengirim data pengguna ke server.
- Jangan menyimpan hasil generate ke server.
- Jika memakai gambar atau screenshot, baca file di browser dan masukkan ke DOCX secara client-side.
- Jangan mengaktifkan `canGenerate` jika format resmi belum jelas.

Untuk mengaktifkan generator pada requirement:

```ts
canGenerate: true,
templateId: "id-template-generator",
```

Jika template masih belum final:

```ts
canGenerate: false,
guideStatus: "draft",
```

## UI dan Aksesibilitas

Project memakai Tailwind CSS dan shadcn/ui. Saat mengubah UI:

- Pertahankan tampilan minimalis, profesional, dan mobile friendly.
- Pastikan dark mode tetap nyaman.
- Gunakan komponen shadcn yang sudah ada di project.
- Gunakan icon dari `lucide-react` jika butuh icon.
- Pastikan tombol memiliki label yang jelas.
- Pastikan input memiliki label dan error state.
- Jangan hanya mengandalkan warna untuk menyampaikan status.
- Cek tampilan mobile untuk card, dialog, sheet, dan form.

## Data dan Privasi

Project ini sengaja tidak memakai backend penyimpanan pengguna.

- Checklist disimpan di IndexedDB browser.
- Link file yang dimasukkan user hanya tersimpan lokal.
- Tidak ada upload file custom ke aplikasi.
- Tidak ada database eksternal.
- Tidak ada analytics atau tracking.

Jangan menambahkan fitur yang mengirim data mahasiswa ke layanan eksternal tanpa diskusi terlebih dahulu.

## Dependency

Jangan menambahkan dependency baru kecuali benar-benar diperlukan.

Jika dependency baru memang dibutuhkan, jelaskan di pull request:

- Masalah apa yang diselesaikan.
- Kenapa solusi tanpa dependency tidak cukup.
- Dampaknya ke bundle size dan maintenance.

Ingat: gunakan Bun untuk install dan menjalankan script.

## Pull Request yang Baik

PR yang baik biasanya punya:

- Ringkasan perubahan.
- Alasan perubahan.
- Screenshot atau rekaman singkat jika mengubah UI.
- Cara verifikasi.
- Catatan jika ada informasi yang masih draft.

Contoh:

```txt
Summary:
- Update panduan bebas pustaka berdasarkan alur terbaru.
- Tambah catatan bahwa dua surat harus digabung menjadi satu PDF.

Verification:
- bun run typecheck
- Cek halaman /panduan dan buka detail Surat Keterangan Bebas Pustaka
```

## Hal yang Perlu Dihindari

- Jangan menambahkan login.
- Jangan menambahkan backend untuk menyimpan data pengguna.
- Jangan membuat upload file ke aplikasi.
- Jangan submit otomatis ke Google Form resmi.
- Jangan mengubah package manager dari Bun.
- Jangan mengaktifkan generator surat jika format final belum jelas.
- Jangan menghapus catatan `draft` hanya agar tampilan terlihat lengkap.

## Catatan untuk Informasi Akademik

Beberapa alur akademik bisa berubah. Jika kamu memperbarui panduan berdasarkan pengalaman pribadi, tulis dengan hati-hati dan tandai sebagai `draft` jika belum dikonfirmasi.

Gunakan sumber resmi jika tersedia, seperti:

- Link Google Form resmi.
- OLS Fasilkom UNSRI.
- SIMAK UNSRI.
- Spreadsheet atau dokumen yang dibagikan program studi.
- Instruksi admin atau koordinator program studi.
