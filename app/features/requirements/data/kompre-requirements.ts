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
  externalLinkLabel?: string;
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
    externalLink: "https://www.iloveimg.com/compress-image/compress-jpg",
    externalLinkLabel: "Kompres Foto di iLoveIMG",
    guideStatus: "ready",
    howToGet: [
      "Siapkan KPM fisik milik Anda.",
      "Letakkan KPM di tempat yang datar dengan pencahayaan cukup.",
      "Foto bagian depan KPM menggunakan kamera ponsel.",
      "Pastikan seluruh bagian kartu terlihat utuh, tidak blur, dan informasi pada kartu dapat dibaca.",
      "Simpan foto dalam format JPG, JPEG, atau PNG.",
      "Pastikan ukuran file tidak lebih dari 1 MB.",
      "Jika ukuran file lebih dari 1 MB, kompres foto terlebih dahulu sebelum diunggah.",
    ],
    notes: [
      "Dokumen yang dibutuhkan berupa foto KPM fisik milik mahasiswa.",
      "Jangan mengunggah foto yang buram, terlalu gelap, atau terpotong.",
      "Gunakan layanan kompres gambar jika ukuran foto terlalu besar.",
      "Simpan file dengan nama yang mudah dikenali, misalnya kpm-nama-mahasiswa.jpg.",
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
    externalLink: "https://akademik.unsri.ac.id/mahasiswa/perkuliahan/krs",
    externalLinkLabel: "Buka Halaman KRS SIMAK UNSRI",
    guideStatus: "ready",
    howToGet: [
      "Buka sistem akademik UNSRI melalui https://akademik.unsri.ac.id.",
      "Login menggunakan akun mahasiswa.",
      "Buka menu Kartu Rencana Studi atau akses halaman KRS secara langsung.",
      "Download semua file PDF KRS dari semester awal sampai semester terakhir yang dibutuhkan.",
      "Cetak KRS yang belum tersedia dalam bentuk cetak.",
      "Jika sudah memiliki KRS versi cetak, gunakan dokumen tersebut dan tidak perlu mencetak ulang.",
      "Temui admin program studi untuk meminta cap pada seluruh dokumen KRS.",
      "Tunggu proses pemberian cap oleh admin program studi, biasanya sekitar 1-2 hari kerja.",
      "Ambil kembali dokumen KRS yang sudah dicap.",
      "Capture atau scan setiap lembar KRS yang sudah dicap.",
      "Gabungkan seluruh hasil capture atau scan KRS ke dalam satu file PDF.",
      "Pastikan file akhir berformat PDF, maksimal 10 MB, dan hanya terdiri dari 1 file.",
    ],
    notes: [
      "Semua KRS dari semester awal sampai semester terakhir harus digabung dalam satu PDF.",
      "KRS harus sudah diberi cap oleh admin program studi.",
      "Jika sudah memiliki KRS cetak, gunakan dokumen tersebut agar tidak perlu mencetak ulang.",
      "Pastikan seluruh KRS yang dikumpulkan lengkap dan sudah dicap.",
    ],
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
    externalLink:
      "https://docs.google.com/spreadsheets/d/1XulVzq8kPr_V5OXYLgs-vV2bxDe2alukgSpubOLYgUs/edit?usp=drive_link",
    externalLinkLabel: "Buka Spreadsheet Pengajuan DKN",
    guideStatus: "ready",
    howToGet: [
      "Buka spreadsheet pengajuan Cetak DKN untuk Kompre.",
      "Tambahkan baris baru pada spreadsheet tersebut.",
      "Isi data yang diminta, seperti nama, NIM, tanggal pengajuan, jurusan atau program studi, dan nomor HP.",
      "Tunggu proses pengecekan dari admin.",
      "Perhatikan kolom Keterangan pada spreadsheet.",
      "Tunggu sekitar 1-3 hari sampai kolom Keterangan bernilai approved.",
      "Jika status sudah approved, temui admin Pusat Pelayanan Terpadu (PPT) di lantai 1 Gedung Diklat Fasilkom UNSRI Bukit.",
      "Sampaikan bahwa kamu ingin mencetak DKN untuk keperluan kompre.",
      "Terima DKN yang sudah dicetak dan dicap oleh admin.",
      "Capture atau scan dokumen DKN tersebut.",
      "Ubah hasil capture atau scan menjadi file PDF.",
      "Pastikan file akhir berformat PDF dan ukuran file tidak lebih dari 1 MB.",
    ],
    notes: [
      "DKN harus menunjukkan seluruh nilai sudah keluar kecuali Projek Akhir.",
      "Pastikan data yang diisi pada spreadsheet benar, terutama nama, NIM, jurusan atau program studi, tanggal pengajuan, dan nomor HP.",
      "Jika setelah lebih dari 3 hari kolom Keterangan masih kosong atau belum diperbarui, temui admin PPT secara langsung.",
      "DKN yang diterima dari admin sudah dalam kondisi dicap.",
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
      "Panduan cara mendapatkan dokumen ini akan ditambahkan kemudian.",
    ],
    notes: ["Dokumen perlu dicap sesuai ketentuan pada form."],
  },
  {
    id: "suliet",
    title: "SULIET minimal score 400",
    category: "akademik",
    description:
      "Surat validasi USEPT sebagai bukti pemenuhan syarat kemampuan bahasa Inggris dengan skor minimal 400.",
    sourceLabel: "SIMAK UNSRI / Admin Program Studi / Koordinator Program Studi",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: true,
    canGenerate: true,
    templateId: "validasi-usept",
    externalLink: "https://akademik.unsri.ac.id/mahasiswa/perkuliahan/nilai-usept",
    externalLinkLabel: "Buka Halaman Nilai USEPT SIMAK UNSRI",
    guideStatus: "ready",
    howToGet: [
      "Pastikan kamu telah mengikuti dan lulus tes USEPT dengan skor minimal 400.",
      "Login ke SIMAK UNSRI melalui https://akademik.unsri.ac.id/login.",
      "Setelah berhasil login, buka menu Nilai USEPT.",
      "Kamu juga dapat langsung membuka halaman nilai USEPT melalui https://akademik.unsri.ac.id/mahasiswa/perkuliahan/nilai-usept.",
      "Lakukan screenshot pada halaman nilai USEPT tersebut.",
      "Pastikan bagian Daftar Nilai Tes USEPT terlihat dengan jelas pada hasil screenshot.",
      "Pastikan screenshot menampilkan nama, NIM, tanggal ujian, skor USEPT, dan status lulus.",
      "Buka generator Surat Validasi USEPT pada sistem panduan ini.",
      "Isi nama, NIM, dan pilih screenshot USEPT dari SIMAK.",
      "Generate dan download surat validasi USEPT dalam format DOCX.",
      "Cetak surat validasi USEPT yang sudah digenerate.",
      "Temui admin program studi dan koordinator program studi untuk meminta validasi.",
      "Jika koordinator program studi memiliki kendala, minta bantuan admin program studi untuk memproses validasi pada bagian koordinator program studi.",
      "Tunggu proses validasi, biasanya sekitar 1-2 hari kerja.",
      "Setelah surat selesai divalidasi, ambil kembali surat tersebut dari admin.",
      "Capture atau scan surat yang sudah divalidasi.",
      "Ubah hasil capture atau scan menjadi file PDF.",
      "Pastikan file akhir berformat PDF dan ukuran file tidak lebih dari 1 MB.",
    ],
    notes: [
      "SULIET merupakan istilah lama; dokumen atau nilai yang digunakan saat ini mengacu pada USEPT.",
      "Surat validasi USEPT harus sudah divalidasi oleh admin program studi dan koordinator program studi.",
      "Screenshot nilai USEPT harus terlihat jelas.",
      "Skor USEPT harus minimal 400 dan statusnya lulus.",
      "Generator hanya membaca screenshot secara lokal di browser untuk dimasukkan ke DOCX; file tidak diupload atau disimpan ke server.",
    ],
  },
  {
    id: "form-rekomendasi-pembimbing",
    title: "Form rekomendasi dari kedua pembimbing untuk ujian komprehensif",
    category: "tugas-akhir",
    description:
      "Form rekomendasi dari dua pembimbing sebagai syarat ujian komprehensif.",
    sourceLabel: "Generator surat / Pembimbing TA",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: true,
    templateId: "rekomendasi-ujian-proyek-akhir",
    guideStatus: "ready",
    howToGet: [
      "Buka fitur generator Surat Rekomendasi Ujian Proyek Akhir pada sistem panduan ini.",
      "Isi data mahasiswa, judul tugas akhir, data Pembimbing I, data Pembimbing II, dan tanggal surat.",
      "Pastikan nama dosen pembimbing sudah menyertakan gelar.",
      "Generate surat rekomendasi ujian proyek akhir.",
      "Sistem akan menghasilkan dua halaman surat, yaitu halaman untuk Pembimbing I dan halaman untuk Pembimbing II.",
      "Download hasil generate surat rekomendasi tersebut.",
      "Cetak atau print surat hasil generate.",
      "Temui Pembimbing I untuk meminta tanda tangan pada surat rekomendasi Pembimbing I.",
      "Temui Pembimbing II untuk meminta tanda tangan pada surat rekomendasi Pembimbing II.",
      "Setelah kedua surat ditandatangani, lakukan capture atau scan terhadap kedua surat tersebut.",
      "Gabungkan hasil capture atau scan kedua surat menjadi 1 file PDF.",
      "Pastikan file akhir berformat PDF dan ukuran file tidak lebih dari 1 MB.",
    ],
    notes: [
      "Surat harus terdiri dari rekomendasi Pembimbing I dan Pembimbing II.",
      "Kedua surat harus sudah ditandatangani oleh masing-masing pembimbing.",
      "Field hari pada tanggal bersifat opsional; jika dikosongkan, surat menyediakan ruang kosong agar dapat diisi manual menggunakan pena.",
      "Fakultas, Program Studi, dan Jenjang menggunakan default Ilmu Komputer, Manajemen Informatika, dan D3.",
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
    guideStatus: "ready",
    howToGet: [
      "Pastikan kamu sudah menyelesaikan kegiatan Kerja Praktik di perusahaan atau instansi tempat KP.",
      "Cek apakah perusahaan atau instansi tempat KP sudah memberikan sertifikat Kerja Praktik atau surat keterangan telah melakukan KP.",
      "Jika dokumen diberikan dalam bentuk file digital, pastikan file tersebut dapat disimpan dalam format PDF.",
      "Jika dokumen masih berbentuk fisik, lakukan capture atau scan dokumen tersebut.",
      "Ubah hasil capture atau scan menjadi file PDF.",
      "Jika belum memiliki sertifikat atau surat keterangan KP, hubungi perusahaan atau instansi tempat kamu melakukan KP.",
      "Sampaikan bahwa dokumen tersebut dibutuhkan untuk keperluan pengajuan kompre D3 Manajemen Informatika Universitas Sriwijaya.",
      "Setelah dokumen diberikan, pastikan dokumen jelas terbaca dan memuat informasi yang diperlukan.",
      "Simpan dokumen akhir dalam format PDF.",
      "Pastikan ukuran file tidak lebih dari 1 MB.",
    ],
    notes: [
      "Dokumen dapat berupa sertifikat Kerja Praktik atau surat keterangan telah melakukan KP.",
      "Tidak ada link khusus untuk dokumen ini; hubungi perusahaan, instansi, atau tempat pelaksanaan KP.",
      "Jika dokumen berbentuk fisik, scan atau capture terlebih dahulu lalu ubah menjadi PDF.",
      "Pastikan hasil scan atau capture terlihat jelas sebelum diunggah.",
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
