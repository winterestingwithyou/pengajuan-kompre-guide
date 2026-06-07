# AGENTS.md

## Project: Landing Page Panduan Pengajuan Kompre

Project ini adalah web app panduan pengajuan komprehensif/kompre untuk mahasiswa. Aplikasi ini berfungsi sebagai halaman panduan sebelum mahasiswa mengisi Google Form resmi pengajuan kompre.

Aplikasi ini tidak menggantikan Google Form utama. Aplikasi hanya membantu mahasiswa memahami dokumen yang dibutuhkan, melakukan checklist kesiapan dokumen, menyimpan link lokasi file dokumen secara lokal, dan membuat surat tertentu yang dapat digenerate sendiri.

Google Form resmi pengajuan kompre:

```txt
https://docs.google.com/forms/d/e/1FAIpQLSdNOyrDGLsFB9PjgMf-fkFQtOh1r9WXRg96il-LJvLgwHjk7Q/viewform
````

## Goals

Aplikasi ini harus membantu pengguna untuk:

1. Memahami alur pengajuan kompre.
2. Melihat daftar dokumen/surat yang perlu disiapkan.
3. Melihat hint atau panduan singkat untuk setiap dokumen.
4. Menandai dokumen yang sudah tersedia.
5. Menyimpan link lokasi file dokumen, misalnya Google Drive, OneDrive, atau link penyimpanan lain.
6. Membuat surat tertentu melalui generator dokumen client-side.
7. Melanjutkan ke Google Form resmi setelah dokumen siap.

## Core Constraints

1. Gunakan React Router v7 Framework Mode.
2. Gunakan shadcn/ui.
3. Gunakan Tailwind CSS.
4. Operasi aplikasi harus dominan client-side.
5. Jangan gunakan database eksternal.
6. Jangan gunakan backend untuk menyimpan data pengguna.
7. Jangan gunakan service eksternal tambahan kecuali link menuju Google Form atau link referensi dokumen.
8. Checklist dan link file dokumen harus disimpan secara lokal menggunakan IndexedDB.
9. Generator surat harus berjalan di browser/client-side.
10. Deploy target adalah Vercel.
11. Desain harus minimalis, profesional, dan guide-able.

## Existing Stack

Project diasumsikan sudah memiliki dependency berikut:

```txt
React Router v7 Framework Mode
shadcn/ui
Tailwind CSS
React Hook Form
Zod
@hookform/resolvers
Dexie
dexie-react-hooks
docx
lucide-react
sonner
date-fns
```

Jangan menambahkan dependency baru kecuali benar-benar diperlukan.

## Important UI Rule

Gunakan komponen shadcn `Field` untuk struktur input form.

Jangan menggunakan pola lama berbasis shadcn `Form`.

Untuk form dengan React Hook Form, gunakan pola:

```txt
useForm
Controller
zodResolver
Field
FieldLabel
FieldDescription
FieldError
FieldGroup
Input
Textarea
Select
Checkbox
```

Contoh pola field:

```tsx
<Controller
  control={form.control}
  name="nama"
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Nama Lengkap</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Masukkan nama lengkap"
      />
      <FieldDescription>
        Gunakan nama lengkap sesuai data akademik.
      </FieldDescription>
      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      )}
    </Field>
  )}
/>
```

## shadcn Components

Project diasumsikan dapat menggunakan komponen berikut.

### Basic Components

```txt
button
card
badge
separator
alert
```

### Guide Components

```txt
accordion
dialog
popover
tooltip
```

### Field/Form Components

```txt
field
input
textarea
select
checkbox
radio-group
calendar
```

### Checklist Components

```txt
progress
tabs
scroll-area
```

### UX Components

```txt
sheet
drawer
command
skeleton
sonner
```

Gunakan komponen secara seperlunya. Jangan membuat UI terlalu kompleks pada setup awal.

## Visual Direction

Gunakan arah desain berikut:

1. Minimalis.
2. Profesional.
3. Banyak whitespace.
4. Card-based layout.
5. Mobile friendly.
6. Fokus ke alur panduan.
7. Gunakan badge untuk status dokumen.
8. Gunakan dialog/popover untuk hint.
9. Gunakan progress bar untuk checklist.
10. Jangan membuat tampilan terlalu ramai.

Tone UI:

```txt
Bersih, akademik, tenang, informatif, dan mudah dipahami.
```

## Route Structure

Gunakan struktur route awal berikut:

```txt
app/routes/
  _index.tsx
  panduan.tsx
  checklist.tsx
  generator.$templateId.tsx
```

Penjelasan route:

| Route                    | Fungsi                                 |
| ------------------------ | -------------------------------------- |
| `/`                      | Landing page utama                     |
| `/panduan`               | Daftar dokumen dan panduan pengajuan   |
| `/checklist`             | Checklist dokumen dan link lokasi file |
| `/generator/:templateId` | Generator surat tertentu               |

## Suggested Folder Structure

Gunakan struktur folder berikut:

```txt
app/
  routes/
    _index.tsx
    panduan.tsx
    checklist.tsx
    generator.$templateId.tsx

  components/
    layout/
      AppHeader.tsx
      AppFooter.tsx
      Section.tsx

  features/
    requirements/
      data/
        kompre-requirements.ts
      components/
        RequirementCard.tsx
        RequirementDetailDialog.tsx
        RequirementSearch.tsx
        RequirementCategoryTabs.tsx

    checklist/
      hooks/
        use-checklist.ts
      components/
        ChecklistPanel.tsx
        ChecklistProgress.tsx
        ChecklistItem.tsx
        ChecklistFileLinkInput.tsx

    letters/
      data/
        letter-templates.ts
      schemas/
        surat-pernyataan-bebas-plagiat.schema.ts
        surat-pemutakhiran-data.schema.ts
      templates/
        generate-surat-pernyataan-bebas-plagiat.ts
        generate-surat-pemutakhiran-data.ts
      components/
        LetterGeneratorForm.tsx
        LetterTemplateCard.tsx

  lib/
    db.ts
    utils.ts
    format-date.ts
    constants.ts
```

## Google Form URL Constant

Buat constant untuk Google Form:

```ts
export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdNOyrDGLsFB9PjgMf-fkFQtOh1r9WXRg96il-LJvLgwHjk7Q/viewform";
```

Tempatkan di:

```txt
app/lib/constants.ts
```

## Requirement Data Model

Data persyaratan disimpan secara statis di dalam project.

File:

```txt
app/features/requirements/data/kompre-requirements.ts
```

Gunakan tipe berikut:

```ts
export type RequirementCategory =
  | "identitas"
  | "akademik"
  | "tugas-akhir"
  | "perpustakaan"
  | "laboratorium"
  | "keuangan"
  | "kerja-praktik"
  | "plagiarisme"
  | "data-akademik"
  | "lainnya";

export type RequirementFileType = "pdf" | "image" | "text" | "other";

export type GuideStatus = "todo" | "draft" | "ready";

export type KompreRequirement = {
  id: string;
  title: string;
  category: RequirementCategory;
  description: string;
  sourceLabel?: string;
  acceptedFileType?: RequirementFileType;
  maxFileSizeMb?: number;
  maxFileCount?: number;
  isRequired: boolean;
  canGenerate: boolean;
  templateId?: string;
  externalLinks?: {
    label: string;
    url: string;
    description?: string;
  }[];
  downloadableAssets?: {
    label: string;
    url: string;
    fileName?: string;
  }[];
  copyablePrompt?: {
    label: string;
    text: string;
  };
  guideStatus: GuideStatus;
  howToGet: string[];
  notes?: string[];
};
```

## Initial Requirement Data

Gunakan data awal berikut berdasarkan field upload dokumen pada Google Form.

Untuk saat ini, isi `howToGet` boleh berupa placeholder karena langkah detail mendapatkan setiap surat akan ditambahkan kemudian.

```ts
export const kompreRequirements: KompreRequirement[] = [
  {
    id: "kpm",
    title: "Kartu Pengenal Mahasiswa (KPM)",
    category: "identitas",
    description: "Kartu identitas mahasiswa yang digunakan sebagai bukti status mahasiswa.",
    sourceLabel: "Mahasiswa",
    acceptedFileType: "image",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
  },
  {
    id: "krs-semester-1-sampai-terakhir",
    title: "KRS dari semester 1 sampai terakhir",
    category: "akademik",
    description: "Kumpulan KRS dari semester awal sampai semester terakhir yang telah dicap.",
    sourceLabel: "Sistem akademik / bagian akademik",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
    notes: [
      "Dokumen perlu dicap sesuai ketentuan pada form."
    ],
  },
  {
    id: "dkn-sudah-keluar-semua-nilai",
    title: "DKN yang sudah keluar semua nilai kecuali Projek Akhir",
    category: "akademik",
    description: "DKN yang menunjukkan seluruh nilai telah keluar kecuali Projek Akhir.",
    sourceLabel: "Bagian akademik",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: true,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
    notes: [
      "DKN perlu dicap sesuai ketentuan pada form."
    ],
  },
  {
    id: "sk-pembimbing-ta",
    title: "SK Pembimbing TA",
    category: "tugas-akhir",
    description: "Surat Keputusan Pembimbing Tugas Akhir yang telah dicap.",
    sourceLabel: "Program studi / bagian akademik",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
    notes: [
      "Dokumen perlu dicap sesuai ketentuan pada form."
    ],
  },
  {
    id: "suliet",
    title: "SULIET minimal score 400",
    category: "akademik",
    description: "Sertifikat atau bukti SULIET dengan skor minimal 400 yang sudah divalidasi.",
    sourceLabel: "Admin dan kaprodi",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: true,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
    notes: [
      "Harus sudah divalidasi oleh admin dan kaprodi MI."
    ],
  },
  {
    id: "form-rekomendasi-pembimbing",
    title: "Form rekomendasi dari kedua pembimbing untuk ujian komprehensif",
    category: "tugas-akhir",
    description: "Form rekomendasi dari dua pembimbing sebagai syarat ujian komprehensif.",
    sourceLabel: "Pembimbing TA",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
  },
  {
    id: "laporan-ta-disetujui",
    title: "Laporan Tugas Akhir yang telah disetujui oleh pembimbing",
    category: "tugas-akhir",
    description: "Laporan Tugas Akhir yang telah disetujui oleh pembimbing.",
    sourceLabel: "Mahasiswa / pembimbing TA",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
    notes: [
      "Pada form tertulis dokumen disetujui pembimbing dan ditandatangani asli."
    ],
  },
  {
    id: "bebas-pustaka",
    title: "Surat Keterangan Bebas Pustaka",
    category: "perpustakaan",
    description: "Surat keterangan bebas pustaka dari Perpustakaan Fasilkom dan Perpustakaan Pusat UNSRI.",
    sourceLabel: "Perpustakaan Fasilkom dan Perpustakaan Pusat UNSRI",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
  },
  {
    id: "bebas-pinjam-alat-laboratorium",
    title: "Surat Keterangan Bebas Pinjam alat laboratorium komputer",
    category: "laboratorium",
    description: "Surat keterangan bebas pinjam alat laboratorium komputer dari administrasi laboratorium Fasilkom.",
    sourceLabel: "Administrasi laboratorium Fasilkom",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
  },
  {
    id: "bebas-pembayaran",
    title: "Surat Keterangan bebas pembayaran apapun",
    category: "keuangan",
    description: "Surat keterangan dari bagian keuangan bahwa mahasiswa sudah bebas pembayaran apapun.",
    sourceLabel: "Bagian keuangan",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
  },
  {
    id: "slip-pembayaran-ukt",
    title: "Bukti Slip Pembayaran UKT dari semester 1 sampai semester terakhir",
    category: "keuangan",
    description: "Bukti slip pembayaran UKT dari semester awal sampai semester terakhir.",
    sourceLabel: "Mahasiswa / sistem pembayaran",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
  },
  {
    id: "kartu-konsultasi-pembimbing",
    title: "Kartu Konsultasi dengan pembimbing",
    category: "tugas-akhir",
    description: "Kartu konsultasi bimbingan dengan pembimbing Tugas Akhir.",
    sourceLabel: "Mahasiswa / pembimbing TA",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
  },
  {
    id: "sertifikat-kerja-praktek",
    title: "Sertifikat Kerja Praktek atau keterangan sudah melakukan KP",
    category: "kerja-praktik",
    description: "Sertifikat Kerja Praktik atau surat keterangan bahwa mahasiswa sudah melaksanakan KP.",
    sourceLabel: "Tempat KP / program studi",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
  },
  {
    id: "tanda-terima-laporan-kp",
    title: "Tanda terima laporan Kerja Praktik (KP)",
    category: "kerja-praktik",
    description: "Dokumen tanda terima laporan Kerja Praktik.",
    sourceLabel: "Program studi / administrasi",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
  },
  {
    id: "dokumen-plagiarisme",
    title: "Dokumen bebas plagiat dan hasil pengecekan plagiat",
    category: "plagiarisme",
    description: "Gabungan dokumen terkait pernyataan bebas plagiat, hasil cek plagiat, dan hasil pengecekan dari perpustakaan.",
    sourceLabel: "Mahasiswa / admin / kaprodi / perpustakaan",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 5,
    isRequired: false,
    canGenerate: true,
    templateId: "surat-pernyataan-bebas-plagiat",
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
    notes: [
      "Upload terpisah menjadi beberapa berkas sesuai poin yang diminta.",
      "Termasuk surat pernyataan bebas plagiat di atas materai 10.000 dan pasfoto warna ukuran 4x6.",
      "Termasuk lampiran hasil cek plagiat dengan skor maksimal 20% yang telah divalidasi oleh admin dan kaprodi.",
      "Termasuk hasil pengecekan dari perpustakaan."
    ],
  },
  {
    id: "forlap-pddikti",
    title: "Capture data Forlap PDDIKTI yang sudah divalidasi oleh BAPSI",
    category: "data-akademik",
    description: "Capture data Forlap PDDIKTI yang telah divalidasi oleh BAPSI.",
    sourceLabel: "Forlap PDDIKTI / BAPSI",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian."
    ],
  },
  {
    id: "surat-pemutakhiran-data",
    title: "Surat pernyataan telah melakukan pemutakhiran data",
    category: "data-akademik",
    description: "Surat pernyataan bahwa mahasiswa telah melakukan pemutakhiran data.",
    sourceLabel: "Dibuat sendiri oleh mahasiswa",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: true,
    templateId: "surat-pernyataan-pemutakhiran-data",
    guideStatus: "todo",
    howToGet: [
      "Surat ini dapat dibuat melalui generator surat pada aplikasi."
    ],
  },
];
```

Field input teks seperti `No. Hp Aktif` tidak perlu dimasukkan ke checklist dokumen.

## Checklist Data Model

Checklist tidak hanya menyimpan status dokumen sudah ada atau belum, tetapi juga menyimpan link lokasi file dokumen.

File:

```txt
app/lib/db.ts
```

Gunakan Dexie:

```ts
import Dexie, { type EntityTable } from "dexie";

export type ChecklistItem = {
  requirementId: string;
  checked: boolean;
  fileUrl?: string;
  note?: string;
  updatedAt: string;
};

export const db = new Dexie("kompre-guide-db") as Dexie & {
  checklist: EntityTable<ChecklistItem, "requirementId">;
};

db.version(1).stores({
  checklist: "requirementId, checked, updatedAt",
});
```

Catatan:

1. `requirementId` menjadi primary key.
2. `checked` menyimpan status dokumen sudah tersedia atau belum.
3. `fileUrl` menyimpan link tempat file berada.
4. `note` dapat dipakai untuk catatan lokal pengguna.
5. Data hanya tersimpan di perangkat/browser pengguna.
6. Jangan mengirim data checklist ke server.

## Checklist Hook

File:

```txt
app/features/checklist/hooks/use-checklist.ts
```

Contoh hook:

```ts
import { useLiveQuery } from "dexie-react-hooks";
import { db, type ChecklistItem } from "@/lib/db";

export function useChecklist() {
  const items = useLiveQuery(() => db.checklist.toArray(), []);

  async function setChecked(requirementId: string, checked: boolean) {
    const existing = await db.checklist.get(requirementId);

    await db.checklist.put({
      requirementId,
      checked,
      fileUrl: existing?.fileUrl ?? "",
      note: existing?.note ?? "",
      updatedAt: new Date().toISOString(),
    });
  }

  async function setFileUrl(requirementId: string, fileUrl: string) {
    const existing = await db.checklist.get(requirementId);

    await db.checklist.put({
      requirementId,
      checked: existing?.checked ?? false,
      fileUrl,
      note: existing?.note ?? "",
      updatedAt: new Date().toISOString(),
    });
  }

  async function setNote(requirementId: string, note: string) {
    const existing = await db.checklist.get(requirementId);

    await db.checklist.put({
      requirementId,
      checked: existing?.checked ?? false,
      fileUrl: existing?.fileUrl ?? "",
      note,
      updatedAt: new Date().toISOString(),
    });
  }

  async function resetChecklist() {
    await db.checklist.clear();
  }

  function getItem(requirementId: string): ChecklistItem | undefined {
    return items?.find((item) => item.requirementId === requirementId);
  }

  return {
    items: items ?? [],
    getItem,
    setChecked,
    setFileUrl,
    setNote,
    resetChecklist,
  };
}
```

## Checklist UI Behavior

Checklist harus memiliki fitur berikut:

1. Menampilkan semua dokumen dari `kompreRequirements`.
2. Setiap dokumen memiliki checkbox.
3. Setiap dokumen memiliki input link file.
4. Link file bersifat opsional.
5. Link file disimpan otomatis ke IndexedDB.
6. Jika dokumen dicentang, tampilkan status “Sudah ada”.
7. Jika dokumen belum dicentang, tampilkan status “Belum ada”.
8. Jika dokumen memiliki `canGenerate: true`, tampilkan tombol “Generate Surat”.
9. Jika dokumen memiliki link file, tampilkan tombol “Buka File”.
10. Tampilkan progress kelengkapan dokumen.

Contoh label UI:

```txt
Sudah ada
Belum ada
Bisa digenerate
Buka File
Simpan Link
Reset Checklist
```

## Checklist Progress

Progress dihitung dari jumlah dokumen yang dicentang.

```ts
const checkedCount = checklistItems.filter((item) => item.checked).length;
const totalCount = kompreRequirements.length;
const progress = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
```

Tampilkan progress dengan shadcn `Progress`.

## Checklist Link Input

Gunakan input biasa untuk menyimpan link file.

Validasi ringan:

1. Link boleh kosong.
2. Jika diisi, sebaiknya diawali dengan `http://` atau `https://`.
3. Jangan upload file ke aplikasi.
4. Jangan simpan file binary di IndexedDB.
5. Simpan hanya URL/link lokasi file.

Contoh placeholder:

```txt
Tempel link Google Drive / OneDrive / lokasi file lainnya
```

## Letter Generator

Generator surat digunakan untuk dokumen yang dapat dibuat sendiri.

Untuk setup awal, siapkan struktur generator tetapi tidak perlu menyelesaikan semua template.

Minimal siapkan template berikut:

```txt
surat-pernyataan-bebas-plagiat
surat-pernyataan-pemutakhiran-data
```

Tipe template:

```ts
export type LetterTemplate = {
  id: string;
  title: string;
  description: string;
  outputFileName: string;
};
```

Data awal:

```ts
export const letterTemplates: LetterTemplate[] = [
  {
    id: "surat-pernyataan-bebas-plagiat",
    title: "Surat Pernyataan Bebas Plagiat",
    description:
      "Generator surat pernyataan bebas plagiat yang dapat digunakan sebagai salah satu dokumen pengajuan kompre.",
    outputFileName: "surat-pernyataan-bebas-plagiat.docx",
  },
  {
    id: "surat-pernyataan-pemutakhiran-data",
    title: "Surat Pernyataan Pemutakhiran Data",
    description:
      "Generator surat pernyataan telah melakukan pemutakhiran data.",
    outputFileName: "surat-pernyataan-pemutakhiran-data.docx",
  },
];
```

## Generator Rules

1. Generator harus berjalan client-side.
2. Output awal disarankan `.docx`.
3. Gunakan library `docx`.
4. Jangan generate dokumen di server.
5. Jangan menyimpan hasil generate ke server.
6. Setelah generate, file langsung diunduh oleh pengguna.
7. Tampilkan catatan agar pengguna memeriksa ulang isi dokumen sebelum digunakan.
8. Jika format final belum pasti, buat placeholder generator terlebih dahulu.

## Landing Page Content

Landing page utama harus memiliki section berikut:

```txt
Hero
Alur Pengajuan Kompre
Ringkasan Dokumen yang Perlu Disiapkan
Fitur Checklist Dokumen
Fitur Generator Surat
CTA ke Panduan
CTA ke Google Form Resmi
FAQ Singkat
```

Hero copy awal:

```txt
Panduan Pengajuan Kompre

Siapkan seluruh dokumen pengajuan kompre dengan lebih terarah. Gunakan checklist untuk menandai dokumen yang sudah tersedia, simpan link file dokumen, dan generate surat yang dapat dibuat mandiri sebelum melanjutkan ke Google Form resmi.
```

CTA utama:

```txt
Mulai Checklist
Lihat Panduan
Buka Google Form
```

## Guide Page Behavior

Halaman `/panduan` harus:

1. Menampilkan daftar semua dokumen.
2. Memiliki filter kategori.
3. Memiliki pencarian dokumen.
4. Menampilkan badge status.
5. Menampilkan detail dokumen.
6. Menampilkan panduan cara mendapatkan dokumen.
7. Menampilkan tombol generator jika dokumen dapat digenerate.
8. Menampilkan tombol menuju link eksternal jika tersedia.
9. Menampilkan catatan penting jika ada.

Karena detail cara mendapatkan surat belum lengkap, gunakan placeholder:

```txt
Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.
```

## Category Labels

Gunakan label kategori berikut:

```ts
export const requirementCategoryLabels: Record<RequirementCategory, string> = {
  identitas: "Identitas",
  akademik: "Akademik",
  "tugas-akhir": "Tugas Akhir",
  perpustakaan: "Perpustakaan",
  laboratorium: "Laboratorium",
  keuangan: "Keuangan",
  "kerja-praktik": "Kerja Praktik",
  plagiarisme: "Plagiarisme",
  "data-akademik": "Data Akademik",
  lainnya: "Lainnya",
};
```

## Badge Rules

Gunakan badge:

| Kondisi                     | Badge                 |
| --------------------------- | --------------------- |
| `isRequired: true`          | Wajib                 |
| `canGenerate: true`         | Bisa Generate         |
| `acceptedFileType: "pdf"`   | PDF                   |
| `acceptedFileType: "image"` | Image                 |
| `guideStatus: "todo"`       | Panduan Belum Lengkap |
| `guideStatus: "ready"`      | Panduan Tersedia      |

## Mobile-first Behavior

Aplikasi harus nyaman digunakan di mobile karena Google Form pada screenshot digunakan dari perangkat mobile.

Pastikan:

1. Card tidak terlalu padat.
2. Font mudah dibaca.
3. Tombol cukup besar.
4. Dialog tidak terlalu tinggi.
5. Checklist mudah discroll.
6. Input link file nyaman dipakai.
7. CTA Google Form mudah ditemukan.

## Accessibility Notes

Pastikan:

1. Setiap input memiliki label.
2. Gunakan `aria-invalid` pada field yang error.
3. Error ditampilkan dengan `FieldError`.
4. Tombol memiliki teks yang jelas.
5. Jangan hanya mengandalkan warna untuk status.
6. Link eksternal diberi indikator jika membuka tab baru.

## Things To Avoid

Jangan lakukan hal berikut pada setup awal:

1. Jangan membuat login.
2. Jangan membuat database eksternal.
3. Jangan membuat backend penyimpanan data.
4. Jangan membuat upload file custom.
5. Jangan mencoba submit otomatis ke Google Form.
6. Jangan menyimpan file dokumen di IndexedDB.
7. Jangan membuat admin panel.
8. Jangan menggunakan CMS eksternal.
9. Jangan menambahkan analytics/tracking.
10. Jangan membuat fitur sinkronisasi cloud.

## Acceptance Criteria Setup Awal

Setup awal dianggap selesai jika:

1. Route `/` tersedia.
2. Route `/panduan` tersedia.
3. Route `/checklist` tersedia.
4. Route `/generator/:templateId` tersedia.
5. Data `kompreRequirements` tersedia.
6. Checklist dapat menyimpan status `checked` ke IndexedDB.
7. Checklist dapat menyimpan `fileUrl` ke IndexedDB.
8. Checklist tetap tersimpan setelah reload browser.
9. Progress checklist tampil.
10. Tombol menuju Google Form resmi tersedia.
11. Dokumen dengan `canGenerate: true` menampilkan tombol generator.
12. Generator page sudah memiliki placeholder UI.
13. UI menggunakan shadcn `Field`, bukan shadcn `Form`.
14. Tidak ada dependency database eksternal.
15. Tidak ada upload file custom ke aplikasi.

## Development Notes

Fokus awal adalah fondasi aplikasi, bukan kelengkapan isi panduan.

Prioritas pengerjaan:

1. Setup route.
2. Setup layout.
3. Setup data requirements.
4. Setup IndexedDB dengan Dexie.
5. Setup checklist dengan status dan link file.
6. Setup landing page.
7. Setup halaman panduan.
8. Setup placeholder generator surat.
9. Tambahkan polish UI setelah fitur dasar berjalan.

Detail cara mendapatkan setiap surat akan ditambahkan kemudian oleh pemilik project.

```
