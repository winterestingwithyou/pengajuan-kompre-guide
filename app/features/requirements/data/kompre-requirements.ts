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
  externalLink?: string;
  guideStatus: GuideStatus;
  howToGet: string[];
  notes?: string[];
};

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

export const requirementCategories: RequirementCategory[] = [
  "identitas",
  "akademik",
  "tugas-akhir",
  "perpustakaan",
  "laboratorium",
  "keuangan",
  "kerja-praktik",
  "plagiarisme",
  "data-akademik",
  "lainnya",
];

export const kompreRequirements: KompreRequirement[] = [
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
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
  },
  {
    id: "krs-semester-1-sampai-terakhir",
    title: "KRS dari semester 1 sampai terakhir",
    category: "akademik",
    description:
      "Kumpulan KRS dari semester awal sampai semester terakhir yang telah dicap.",
    sourceLabel: "Sistem akademik / bagian akademik",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
    notes: ["Dokumen perlu dicap sesuai ketentuan pada form."],
  },
  {
    id: "dkn-sudah-keluar-semua-nilai",
    title: "DKN yang sudah keluar semua nilai kecuali Projek Akhir",
    category: "akademik",
    description:
      "DKN yang menunjukkan seluruh nilai telah keluar kecuali Projek Akhir.",
    sourceLabel: "Bagian akademik",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: true,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
    notes: ["DKN perlu dicap sesuai ketentuan pada form."],
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
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
    notes: ["Dokumen perlu dicap sesuai ketentuan pada form."],
  },
  {
    id: "suliet",
    title: "SULIET minimal score 400",
    category: "akademik",
    description:
      "Sertifikat atau bukti SULIET dengan skor minimal 400 yang sudah divalidasi.",
    sourceLabel: "Admin dan kaprodi",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: true,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
    notes: ["Harus sudah divalidasi oleh admin dan kaprodi MI."],
  },
  {
    id: "form-rekomendasi-pembimbing",
    title: "Form rekomendasi dari kedua pembimbing untuk ujian komprehensif",
    category: "tugas-akhir",
    description:
      "Form rekomendasi dari dua pembimbing sebagai syarat ujian komprehensif.",
    sourceLabel: "Pembimbing TA",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
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
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
    notes: [
      "Pada form tertulis dokumen disetujui pembimbing dan ditandatangani asli.",
    ],
  },
  {
    id: "bebas-pustaka",
    title: "Surat Keterangan Bebas Pustaka",
    category: "perpustakaan",
    description:
      "Surat keterangan bebas pustaka dari Perpustakaan Fasilkom dan Perpustakaan Pusat UNSRI.",
    sourceLabel: "Perpustakaan Fasilkom dan Perpustakaan Pusat UNSRI",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
  },
  {
    id: "bebas-pinjam-alat-laboratorium",
    title: "Surat Keterangan Bebas Pinjam alat laboratorium komputer",
    category: "laboratorium",
    description:
      "Surat keterangan bebas pinjam alat laboratorium komputer dari administrasi laboratorium Fasilkom.",
    sourceLabel: "Administrasi laboratorium Fasilkom",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
  },
  {
    id: "bebas-pembayaran",
    title: "Surat Keterangan bebas pembayaran apapun",
    category: "keuangan",
    description:
      "Surat keterangan dari bagian keuangan bahwa mahasiswa sudah bebas pembayaran apapun.",
    sourceLabel: "Bagian keuangan",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
  },
  {
    id: "slip-pembayaran-ukt",
    title: "Bukti Slip Pembayaran UKT dari semester 1 sampai semester terakhir",
    category: "keuangan",
    description:
      "Bukti slip pembayaran UKT dari semester awal sampai semester terakhir.",
    sourceLabel: "Mahasiswa / sistem pembayaran",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
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
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
  },
  {
    id: "sertifikat-kerja-praktek",
    title: "Sertifikat Kerja Praktek atau keterangan sudah melakukan KP",
    category: "kerja-praktik",
    description:
      "Sertifikat Kerja Praktik atau surat keterangan bahwa mahasiswa sudah melaksanakan KP.",
    sourceLabel: "Tempat KP / program studi",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
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
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
  },
  {
    id: "dokumen-plagiarisme",
    title: "Dokumen bebas plagiat dan hasil pengecekan plagiat",
    category: "plagiarisme",
    description:
      "Gabungan dokumen terkait pernyataan bebas plagiat, hasil cek plagiat, dan hasil pengecekan dari perpustakaan.",
    sourceLabel: "Mahasiswa / admin / kaprodi / perpustakaan",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 5,
    isRequired: false,
    canGenerate: true,
    templateId: "surat-pernyataan-bebas-plagiat",
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
    notes: [
      "Upload terpisah menjadi beberapa berkas sesuai poin yang diminta.",
      "Termasuk surat pernyataan bebas plagiat di atas materai 10.000 dan pasfoto warna ukuran 4x6.",
      "Termasuk lampiran hasil cek plagiat dengan skor maksimal 20% yang telah divalidasi oleh admin dan kaprodi.",
      "Termasuk hasil pengecekan dari perpustakaan.",
    ],
  },
  {
    id: "forlap-pddikti",
    title: "Capture data Forlap PDDIKTI yang sudah divalidasi oleh BAPSI",
    category: "data-akademik",
    description:
      "Capture data Forlap PDDIKTI yang telah divalidasi oleh BAPSI.",
    sourceLabel: "Forlap PDDIKTI / BAPSI",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "todo",
    howToGet: [
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
  },
  {
    id: "surat-pemutakhiran-data",
    title: "Surat pernyataan telah melakukan pemutakhiran data",
    category: "data-akademik",
    description:
      "Surat pernyataan bahwa mahasiswa telah melakukan pemutakhiran data.",
    sourceLabel: "Dibuat sendiri oleh mahasiswa",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: true,
    templateId: "surat-pernyataan-pemutakhiran-data",
    guideStatus: "todo",
    howToGet: ["Surat ini dapat dibuat melalui generator surat pada aplikasi."],
  },
];
