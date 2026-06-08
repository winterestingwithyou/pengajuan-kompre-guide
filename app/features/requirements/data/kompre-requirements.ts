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

export type RequirementExternalLink = {
  label: string;
  url: string;
  description?: string;
};

export type RequirementDownloadableAsset = {
  label: string;
  url: string;
  fileName?: string;
};

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
  externalLinks?: RequirementExternalLink[];
  downloadableAssets?: RequirementDownloadableAsset[];
  copyablePrompt?: {
    label: string;
    text: string;
  };
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
    externalLinks: [
      {
        label: "Kompres Foto di iLoveIMG",
        url: "https://www.iloveimg.com/compress-image/compress-jpg",
      },
    ],
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
      "Kumpulan KRS gabungan dari semester yang diminta (umumnya semester 1 sampai 6) tanpa cap.",
    sourceLabel: "Sistem akademik / bagian akademik",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    externalLinks: [
      {
        label: "Login SIMAK UNSRI",
        url: "https://akademik.unsri.ac.id/login",
      },
      {
        label: "Buka Halaman KRS SIMAK UNSRI",
        url: "https://akademik.unsri.ac.id/mahasiswa/perkuliahan/krs",
      },
    ],
    guideStatus: "ready",
    howToGet: [
      "Buka [SIMAK UNSRI](https://akademik.unsri.ac.id).",
      "Login menggunakan akun mahasiswa.",
      "Buka menu Kartu Rencana Studi atau akses halaman KRS secara langsung.",
      "Download semua file PDF KRS dari semester yang diminta, misalnya semester 1 sampai semester 6.",
      "Gabungkan semua file PDF KRS ke dalam satu file.",
      "Pastikan file akhir berformat PDF, maksimal 10 MB, dan hanya terdiri dari 1 file.",
    ],
    notes: [
      "Semua KRS dari semester yang diminta (umumnya semester 1 sampai semester 6) harus digabung dalam satu PDF.",
      "KRS tidak wajib diberi cap.",
      "Pastikan seluruh KRS yang dikumpulkan lengkap dan sudah digabung menjadi satu file PDF.",
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
    externalLinks: [
      {
        label: "Buka Spreadsheet Pengajuan DKN",
        url: "https://docs.google.com/spreadsheets/d/1XulVzq8kPr_V5OXYLgs-vV2bxDe2alukgSpubOLYgUs/edit?usp=drive_link",
      },
    ],
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
    description:
      "Surat Keputusan Pembimbing Tugas Akhir yang berisi daftar mahasiswa beserta dosen pembimbingnya dan sudah dicap.",
    sourceLabel: "Surat Keputusan Pembimbing TA / Program Studi",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    externalLinks: [
      {
        label: "Edit Highlight di ChatGPT",
        url: "https://chatgpt.com",
        description:
          "Gunakan ChatGPT untuk memberi efek stabilo pada baris nama mahasiswa.",
      },
      {
        label: "Gabung JPG ke PDF di iLovePDF",
        url: "https://www.ilovepdf.com/jpg_to_pdf",
        description:
          "Gabungkan seluruh gambar halaman SK menjadi satu file PDF.",
      },
    ],
    downloadableAssets: [
      {
        label: "Halaman 1",
        url: "/sk-pembimbing-ta/SK%20Pembimbing%20TA_1.jpg",
        fileName: "SK Pembimbing TA_1.jpg",
      },
      {
        label: "Halaman 2",
        url: "/sk-pembimbing-ta/SK%20Pembimbing%20TA_2.jpg",
        fileName: "SK Pembimbing TA_2.jpg",
      },
      {
        label: "Halaman 3",
        url: "/sk-pembimbing-ta/SK%20Pembimbing%20TA_3.jpg",
        fileName: "SK Pembimbing TA_3.jpg",
      },
      {
        label: "Halaman 4",
        url: "/sk-pembimbing-ta/SK%20Pembimbing%20TA_4.jpg",
        fileName: "SK Pembimbing TA_4.jpg",
      },
      {
        label: "Halaman 5",
        url: "/sk-pembimbing-ta/SK%20Pembimbing%20TA_5.jpg",
        fileName: "SK Pembimbing TA_5.jpg",
      },
      {
        label: "Halaman 6",
        url: "/sk-pembimbing-ta/SK%20Pembimbing%20TA_6.jpg",
        fileName: "SK Pembimbing TA_6.jpg",
      },
    ],
    copyablePrompt: {
      label: "Copy Prompt Highlight Baris Nama",
      text: `Edit gambar dokumen/tabel yang saya unggah.

Tolong tingkatkan kualitas gambar agar lebih jelas/HD:
- tajamkan teks dan garis tabel,
- kurangi blur/noise,
- rapikan pencahayaan,
- tetap pertahankan bentuk dokumen asli secara natural.

Lalu beri efek stabilo/highlighter transparan pada tepat satu baris saja, yaitu baris dengan data berikut:

Nomor baris: [ISI NOMOR BARIS]
NIM/ID: [ISI NIM/ID]
Nama: [ISI NAMA]

Ketentuan stabilo:
- Stabilo harus pas di baris tersebut saja.
- Jangan mengenai baris di atas atau di bawahnya.
- Stabilo satu baris penuh dari kolom paling kiri sampai kolom paling kanan.
- Gunakan warna stabilo [kuning/hijau/biru/pink] yang transparan.
- Teks dan garis tabel tetap harus terbaca jelas.
- Jangan mengubah isi teks, nama, angka, atau struktur tabel lainnya.
- Jangan membuat ulang dokumen dari nol; cukup edit gambar asli.`,
    },
    guideStatus: "ready",
    howToGet: [
      "Download seluruh gambar halaman SK Pembimbing TA yang tersedia pada panduan ini.",
      "SK terdiri dari 6 halaman. Halaman 3 sampai 6 berisi tabel daftar mahasiswa beserta dosen pembimbingnya.",
      "Cari nama kamu pada tabel di halaman 3 sampai 6.",
      "Buka halaman gambar yang memuat nama kamu.",
      "Buka [ChatGPT](https://chatgpt.com).",
      "Upload gambar halaman yang memuat nama kamu ke ChatGPT.",
      "Copy prompt highlight dari panduan ini.",
      "Ganti bagian [ISI NOMOR BARIS], [ISI NIM/ID], dan [ISI NAMA] sesuai baris data kamu.",
      "Kirim prompt tersebut agar ChatGPT meningkatkan kualitas gambar dan memberi efek stabilo transparan pada tepat satu baris nama kamu.",
      "Download hasil edit gambar dari ChatGPT.",
      "Ganti gambar halaman asli yang memuat nama kamu dengan gambar hasil edit yang sudah diberi stabilo.",
      "Pastikan 6 gambar halaman SK tetap lengkap dan urut dari halaman 1 sampai halaman 6.",
      "Buka [iLovePDF JPG to PDF](https://www.ilovepdf.com/jpg_to_pdf).",
      "Upload seluruh gambar halaman SK yang sudah final ke iLovePDF.",
      "Gabungkan seluruh gambar menjadi 1 file PDF.",
      "Pastikan file akhir berformat PDF dan ukuran file tidak lebih dari 1 MB.",
    ],
    notes: [
      "Syarat yang benar adalah Surat Keputusan Pembimbing TA, bukan Surat Kesediaan Pembimbing TA.",
      "File gambar SK yang tersedia pada panduan ini sudah dicap, sehingga mahasiswa tidak perlu mencetak ulang PDF asli untuk meminta cap admin.",
      "Mahasiswa hanya perlu memberi efek stabilo pada baris namanya di halaman tabel yang sesuai.",
      "Halaman yang tidak memuat nama mahasiswa tidak perlu diedit.",
      "Saat menggabungkan ke PDF, gunakan semua halaman SK. Hanya ganti halaman yang memuat nama kamu dengan versi yang sudah diberi stabilo.",
      "Pastikan teks, angka, nama, dan struktur tabel tidak berubah setelah diedit.",
    ],
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
    externalLinks: [
      {
        label: "Login SIMAK UNSRI",
        url: "https://akademik.unsri.ac.id/login",
      },
      {
        label: "Buka Halaman Nilai USEPT SIMAK UNSRI",
        url: "https://akademik.unsri.ac.id/mahasiswa/perkuliahan/nilai-usept",
      },
    ],
    guideStatus: "ready",
    howToGet: [
      "Pastikan kamu telah mengikuti dan lulus tes USEPT dengan skor minimal 400.",
      "Login ke [SIMAK UNSRI](https://akademik.unsri.ac.id/login).",
      "Setelah berhasil login, buka menu Nilai USEPT.",
      "Kamu juga dapat langsung membuka [halaman Nilai USEPT SIMAK UNSRI](https://akademik.unsri.ac.id/mahasiswa/perkuliahan/nilai-usept).",
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
    description:
      "Laporan Tugas Akhir final yang sudah disetujui oleh Pembimbing I dan Pembimbing II, serta menggunakan lembar pengesahan resmi dari OLS Fasilkom UNSRI.",
    sourceLabel: "OLS Fasilkom UNSRI / Pembimbing TA",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    externalLinks: [
      {
        label: "Buka OLS Fasilkom UNSRI",
        url: "https://ols.ilkom.unsri.ac.id",
      },
      {
        label: "Login OLS Fasilkom UNSRI",
        url: "https://ols.ilkom.unsri.ac.id/login",
      },
      {
        label: "Registrasi OLS Fasilkom UNSRI",
        url: "https://ols.ilkom.unsri.ac.id/umum/register",
      },
    ],
    guideStatus: "ready",
    howToGet: [
      "Pastikan laporan Tugas Akhir sudah disetujui oleh Pembimbing I dan Pembimbing II.",
      "Buka [website OLS Fasilkom UNSRI](https://ols.ilkom.unsri.ac.id).",
      "Login ke [akun OLS Fasilkom UNSRI](https://ols.ilkom.unsri.ac.id/login).",
      "Jika belum memiliki akun, lakukan [registrasi OLS Fasilkom UNSRI](https://ols.ilkom.unsri.ac.id/umum/register) terlebih dahulu.",
      "Setelah berhasil login, masuk ke dashboard OLS.",
      "Pada bagian Pengajuan, klik tombol + Tambah.",
      "Pilih jenis surat LEMBAR PENGESAHAN PROJEK AKHIR (D3 MANAJEMEN INFORMATIKA).",
      "Lengkapi data pengajuan, meliputi nama Pembimbing I, NIP Pembimbing I, nama Pembimbing II, NIP Pembimbing II, judul Tugas Akhir, dan Form Revisi.",
      "Isi judul Tugas Akhir dengan huruf kapital atau uppercase.",
      "Pada bagian Form Revisi, isi terlebih dahulu dengan tanda -.",
      "Jika setelah pengajuan admin meminta Form Revisi, lampirkan link penyimpanan yang menampilkan dokumen Form Revisi.",
      "Pastikan link Form Revisi dapat dibuka dan dilihat oleh admin.",
      "Setelah semua data terisi, klik Ajukan.",
      "Tunggu proses pembuatan lembar pengesahan. Biasanya proses ini membutuhkan waktu sekitar 1-2 hari kerja.",
      "Login kembali ke OLS dan periksa status pengajuan lembar pengesahan.",
      "Jika status sudah selesai, buka dan download dokumen lembar pengesahan dari OLS.",
      "Buka file laporan Tugas Akhir yang sudah disetujui oleh pembimbing.",
      "Ganti halaman kedua laporan, yaitu halaman setelah cover, dengan lembar pengesahan yang sudah diunduh dari OLS.",
      "Setelah halaman lembar pengesahan diganti, simpan atau ekspor laporan menjadi file PDF.",
      "Pastikan file laporan akhir siap dikumpulkan dan ukuran file tidak lebih dari 10 MB.",
    ],
    notes: [
      "Laporan Tugas Akhir harus sudah disetujui oleh Pembimbing I dan Pembimbing II.",
      "Lembar pengesahan laporan harus menggunakan lembar pengesahan yang diterbitkan dari OLS.",
      "Halaman lembar pengesahan diletakkan setelah cover laporan.",
      "File yang dikumpulkan adalah laporan Tugas Akhir final yang sudah digabung dengan lembar pengesahan dari OLS.",
      "Jika diminta Form Revisi oleh admin, link Form Revisi wajib dapat diakses oleh admin.",
      "Pastikan file akhir berformat PDF, maksimal 10 MB, dan hanya 1 file.",
    ],
  },
  {
    id: "bebas-pustaka",
    title: "Surat Keterangan Bebas Pustaka",
    category: "perpustakaan",
    description:
      "Surat keterangan bahwa mahasiswa tidak memiliki urusan, tanggungan, atau peminjaman yang belum diselesaikan di Perpustakaan Fasilkom dan Perpustakaan Pusat UNSRI.",
    sourceLabel: "Perpustakaan Fasilkom dan Perpustakaan Pusat UNSRI",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    externalLinks: [
      {
        label: "Form Bebas Pustaka Fasilkom",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSe-ekfPwy-LYf8FDnDDoQoXn1JhKbuA81xwKoN02vKjrGojeA/viewform",
      },
      {
        label: "Chat Petugas Perpustakaan Fasilkom",
        url: "https://wa.me/6282184658686",
        description:
          "Hubungi Bapak Hendri Yunizar jika ingin mengambil surat di kampus Palembang.",
      },
      {
        label: "Form Bebas Pustaka Perpustakaan Pusat UNSRI",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfchI5xtuzZc2g_3jKYfLYtv_2_xEmtb_0ApCA7-g9uOy1BpQ/viewform",
      },
      {
        label: "Repository UNSRI",
        url: "https://repository.unsri.ac.id",
      },
      {
        label: "Template Surat Pernyataan Perpustakaan Pusat",
        url: "https://docs.google.com/document/d/1kO2MYY-038WRV7G-qn88a2doNTor7zYq/edit?usp=sharing&ouid=114205431352930171431&rtpof=true&sd=true",
      },
    ],
    guideStatus: "ready",
    howToGet: [
      "Untuk Surat Bebas Pustaka Perpustakaan Fasilkom, isi terlebih dahulu [Form Bebas Pustaka Fasilkom](https://docs.google.com/forms/d/e/1FAIpQLSe-ekfPwy-LYf8FDnDDoQoXn1JhKbuA81xwKoN02vKjrGojeA/viewform).",
      "Pastikan data yang kamu isi pada form sudah benar sebelum dikirim.",
      "Setelah mengisi form, ambil suratnya di Perpustakaan Fasilkom Indralaya.",
      "Jika tidak memungkinkan mengambil di Indralaya, kamu dapat mengambil surat di kampus Palembang.",
      "Untuk pengambilan di Palembang, hubungi petugas Perpustakaan Fasilkom, Bapak Hendri Yunizar, melalui [WhatsApp](https://wa.me/6282184658686).",
      "Sampaikan bahwa kamu sudah mengisi form bebas pustaka dan ingin mengambil suratnya di kampus Palembang.",
      "Tunggu konfirmasi dari petugas mengenai apakah surat sudah dibuat dan kapan petugas bersedia menyerahkan surat tersebut.",
      "Datang pada waktu yang sudah disepakati untuk mengambil Surat Bebas Pustaka Fasilkom.",
      "Setelah surat diterima, lakukan scan atau capture agar menjadi file digital yang jelas terbaca.",
      "Untuk Surat Bebas Pustaka Perpustakaan Pusat UNSRI, siapkan Surat Keterangan atau bukti penyerahan Skripsi/Tesis/Disertasi tercetak ke UPT Perpustakaan UNSRI Indralaya yang sudah dicap.",
      "Siapkan link Repository Tugas Akhir yang sudah dipublish pada [Repository UNSRI](https://repository.unsri.ac.id).",
      "Buat surat pernyataan menggunakan [template Surat Pernyataan Perpustakaan Pusat](https://docs.google.com/document/d/1kO2MYY-038WRV7G-qn88a2doNTor7zYq/edit?usp=sharing&ouid=114205431352930171431&rtpof=true&sd=true).",
      "Cetak, tanda tangani, lalu scan surat pernyataan tersebut.",
      "Jika seluruh syarat Perpustakaan Pusat sudah siap, ajukan melalui [Form Bebas Pustaka Perpustakaan Pusat UNSRI](https://docs.google.com/forms/d/e/1FAIpQLSfchI5xtuzZc2g_3jKYfLYtv_2_xEmtb_0ApCA7-g9uOy1BpQ/viewform).",
      "Setelah pengajuan Perpustakaan Pusat dikirim, cek email secara berkala termasuk folder spam.",
      "Download hasil verifikasi dan Surat Keterangan Bebas Pustaka dari email setelah dikirimkan.",
      "Gabungkan Surat Bebas Pustaka Fasilkom dan Surat Bebas Pustaka Perpustakaan Pusat UNSRI menjadi 1 file PDF.",
      "Pastikan file akhir berformat PDF dan ukuran file tidak lebih dari 1 MB.",
    ],
    notes: [
      "Dokumen harus berisi surat bebas pustaka dari Perpustakaan Fasilkom dan Perpustakaan Pusat UNSRI.",
      "Kedua surat harus digabungkan menjadi satu file PDF.",
      "Jika surat berbentuk fisik, lakukan capture atau scan terlebih dahulu.",
      "Untuk pengambilan Surat Bebas Pustaka Fasilkom di Palembang, hubungi Bapak Hendri Yunizar terlebih dahulu agar waktu pengambilan jelas.",
      "Hasil verifikasi dan Surat Keterangan Bebas Pustaka Perpustakaan Pusat UNSRI dikirimkan melalui email. Cek juga folder spam.",
      "Segera download file bebas pustaka dari email karena file akan terhapus otomatis oleh sistem setelah 1 bulan.",
    ],
  },
  {
    id: "bebas-pinjam-alat-laboratorium",
    title: "Surat Keterangan Bebas Pinjam alat laboratorium komputer",
    category: "laboratorium",
    description:
      "Surat keterangan bahwa mahasiswa tidak memiliki tanggungan peminjaman alat laboratorium komputer.",
    sourceLabel: "SIMLAB Fasilkom UNSRI",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    externalLinks: [
      {
        label: "Registrasi SIMLAB",
        url: "https://simlab.ilkom.unsri.ac.id/register",
      },
      {
        label: "Login SIMLAB",
        url: "https://simlab.ilkom.unsri.ac.id/login",
      },
      {
        label: "Menu Surat Bebas SIMLAB",
        url: "https://simlab.ilkom.unsri.ac.id/clearance-requests",
      },
    ],
    guideStatus: "draft",
    howToGet: [
      "Jika belum memiliki akun SIMLAB, daftar terlebih dahulu sebagai mahasiswa melalui [halaman registrasi SIMLAB](https://simlab.ilkom.unsri.ac.id/register).",
      "Jika sudah terdaftar, login melalui [halaman login SIMLAB](https://simlab.ilkom.unsri.ac.id/login).",
      "Setelah berhasil login, kamu akan diarahkan ke dashboard SIMLAB.",
      "Pada dashboard, pilih menu Surat Bebas atau langsung buka [menu Surat Bebas SIMLAB](https://simlab.ilkom.unsri.ac.id/clearance-requests).",
      "Mulai pengajuan Surat Bebas Peminjaman Laboratorium.",
      "Isi Judul Tugas Akhir pada field yang tersedia.",
      "Siapkan dan upload file KPM dalam format PDF dengan ukuran maksimal 500 KB.",
      "Siapkan dan upload file Cover Depan Skripsi dalam format PDF dengan ukuran maksimal 500 KB.",
      "Siapkan dan upload file Form Perbaikan/Konsultasi dalam format PDF dengan ukuran maksimal 500 KB.",
      "Siapkan dan upload file Form Penyerahan TA.1 atau Form Surat Rekomendasi Ujian Kompre dalam format PDF dengan ukuran maksimal 500 KB.",
      "Pastikan seluruh file yang diupload sudah benar, jelas terbaca, dan sesuai field masing-masing.",
      "Klik Ajukan Surat Bebas untuk mengirim pengajuan.",
      "Tunggu proses dari pihak laboratorium atau ikuti instruksi lanjutan yang muncul pada SIMLAB.",
      "Jika surat sudah selesai dan dapat diunduh, simpan hasilnya untuk kebutuhan pengajuan kompre.",
      "Pastikan file akhir berformat PDF dan ukuran file tidak lebih dari 10 MB.",
    ],
    notes: [
      "Panduan ini masih berstatus draft karena bentuk surat hasil keluaran dari SIMLAB belum diketahui secara pasti.",
      "Belum diketahui apakah hasil akhir dari SIMLAB langsung berbentuk PDF atau perlu langkah tambahan setelah pengajuan disetujui.",
      "Syarat upload pada SIMLAB masing-masing memiliki batas ukuran maksimal 500 KB dan harus berbentuk PDF.",
      "Dokumen pendukung yang perlu disiapkan adalah KPM, Cover Depan Skripsi, Form Perbaikan/Konsultasi, serta Form Penyerahan TA.1 atau Form Surat Rekomendasi Ujian Kompre.",
      "Jika hasil surat dari SIMLAB diberikan dalam format selain PDF, ikuti instruksi lanjutan dari pihak laboratorium atau ubah hasilnya ke PDF sebelum diunggah ke form kompre.",
    ],
  },
  {
    id: "bebas-pembayaran",
    title: "Surat Keterangan bebas pembayaran apapun",
    category: "keuangan",
    description:
      "Surat keterangan dari OLS Fasilkom UNSRI yang menunjukkan mahasiswa tidak memiliki tanggungan pembayaran yang perlu diselesaikan.",
    sourceLabel: "OLS Fasilkom UNSRI",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    externalLinks: [
      {
        label: "Buka OLS Fasilkom UNSRI",
        url: "https://ols.ilkom.unsri.ac.id",
      },
      {
        label: "Login OLS Fasilkom UNSRI",
        url: "https://ols.ilkom.unsri.ac.id/login",
      },
      {
        label: "Registrasi OLS Fasilkom UNSRI",
        url: "https://ols.ilkom.unsri.ac.id/umum/register",
      },
    ],
    guideStatus: "ready",
    howToGet: [
      "Buka [website OLS Fasilkom UNSRI](https://ols.ilkom.unsri.ac.id).",
      "Login ke [akun OLS Fasilkom UNSRI](https://ols.ilkom.unsri.ac.id/login).",
      "Jika belum memiliki akun, lakukan [registrasi OLS Fasilkom UNSRI](https://ols.ilkom.unsri.ac.id/umum/register) terlebih dahulu.",
      "Setelah berhasil login, masuk ke dashboard OLS.",
      "Pada bagian Pengajuan, klik tombol + Tambah.",
      "Pilih jenis surat SURAT KETERANGAN PEMBAYARAN.",
      "Lengkapi syarat pengajuan yang diminta.",
      "Syarat yang perlu dilengkapi adalah bukti slip pembayaran dari semester awal hingga akhir atau semester saat ini.",
      "Untuk syarat tersebut, siapkan link penyimpanan yang berisi bukti slip pembayaran UKT dari semester awal hingga semester akhir atau semester saat ini.",
      "Link penyimpanan dapat berupa Google Drive atau layanan penyimpanan lain.",
      "Pastikan link yang dilampirkan dapat dibuka dan dilihat oleh admin.",
      "Jika kamu merupakan mahasiswa terdaftar KIPK, lampirkan link penyimpanan yang berisi SK KIPK yang memuat nama kamu.",
      "Setelah semua syarat terpenuhi, klik Ajukan untuk mengirim pengajuan surat.",
      "Tunggu proses pembuatan surat. Biasanya proses ini membutuhkan waktu sekitar 1-2 hari kerja.",
      "Setelah itu, login kembali ke OLS dan periksa status pengajuan surat.",
      "Jika status surat sudah selesai, buka dan download surat dari OLS.",
      "Surat yang diunduh dari OLS sudah berbentuk PDF.",
      "Simpan file PDF hasil download untuk diunggah pada form pengajuan kompre.",
    ],
    notes: [
      "Syarat pengajuan pada OLS menggunakan link penyimpanan, bukan upload file langsung.",
      "Link bukti pembayaran UKT atau SK KIPK wajib dapat dibuka oleh admin.",
      "Untuk mahasiswa KIPK, gunakan SK KIPK yang memuat nama kamu sebagai dokumen pendukung.",
      "File akhir yang diunggah ke form kompre harus PDF, maksimal 1 MB, dan hanya 1 file.",
    ],
  },
  {
    id: "slip-pembayaran-ukt",
    title: "Bukti Slip Pembayaran UKT dari semester 1 sampai semester terakhir",
    category: "keuangan",
    description:
      "Bukti pembayaran UKT dari semester awal sampai semester terakhir yang digabung menjadi satu file PDF, atau SK KIPK untuk mahasiswa terdaftar KIPK.",
    sourceLabel: "Mahasiswa / bukti pembayaran / SK KIPK",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    externalLinks: [
      {
        label: "Buka Folder SK KIPK",
        url: "https://drive.google.com/drive/folders/1h7Bkp2UCqIRnu8ZObW3v4-N89qS5p8L4?usp=sharing",
      },
    ],
    guideStatus: "ready",
    howToGet: [
      "Kumpulkan seluruh bukti atau slip pembayaran UKT dari semester 1 sampai semester terakhir.",
      "Pastikan setiap bukti pembayaran terlihat jelas, terutama bagian nama mahasiswa, NIM jika tersedia, semester pembayaran, nominal pembayaran, dan status atau bukti pembayaran.",
      "Jika bukti pembayaran masih berbentuk fisik, lakukan capture atau foto pada setiap bukti pembayaran.",
      "Jika bukti pembayaran sudah berbentuk digital, gunakan file atau screenshot bukti pembayaran tersebut.",
      "Susun seluruh bukti pembayaran UKT dari semester awal sampai semester terakhir.",
      "Gabungkan seluruh hasil capture, foto, screenshot, atau file bukti pembayaran menjadi 1 file PDF.",
      "Pastikan file akhir berformat PDF.",
      "Pastikan ukuran file tidak lebih dari 10 MB.",
      "Jika kamu merupakan mahasiswa terdaftar KIPK, lampirkan SK KIPK yang terdapat nama kamu di dalamnya.",
      "Untuk mahasiswa KIPK, buka [folder SK KIPK](https://drive.google.com/drive/folders/1h7Bkp2UCqIRnu8ZObW3v4-N89qS5p8L4?usp=sharing).",
      "Cari dan download SK KIPK yang sesuai dengan data kamu.",
      "Pastikan nama kamu tercantum pada SK KIPK tersebut.",
      "Jika SK KIPK sudah berbentuk PDF, gunakan file tersebut.",
      "Jika SK KIPK masih berupa gambar atau hasil capture, ubah menjadi file PDF.",
      "Pastikan file akhir SK KIPK berformat PDF dan ukuran file tidak lebih dari 10 MB.",
    ],
    notes: [
      "Bukti atau slip pembayaran UKT dari semester 1 sampai semester terakhir harus digabung menjadi satu file PDF.",
      "Jika mahasiswa terdaftar KIPK, lampirkan SK KIPK yang terdapat nama mahasiswa.",
      "Hasil capture, foto, atau screenshot harus terlihat jelas.",
      "Pastikan file akhir berformat PDF, maksimal 10 MB, dan hanya 1 file.",
    ],
  },
  {
    id: "kartu-konsultasi-pembimbing",
    title: "Kartu Konsultasi dengan pembimbing",
    category: "tugas-akhir",
    description:
      "Kartu konsultasi bimbingan Tugas Akhir berdasarkan asistensi yang sudah disetujui pada SIMAK UNSRI.",
    sourceLabel: "SIMAK UNSRI / Generator surat / Koordinator Program Studi",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: true,
    templateId: "kartu-konsultasi-tugas-akhir",
    externalLinks: [
      {
        label: "Login SIMAK UNSRI",
        url: "https://akademik.unsri.ac.id/login",
      },
      {
        label: "Buka Bimbingan Tugas Akhir SIMAK",
        url: "https://akademik.unsri.ac.id/mahasiswa/bimbingan-tugas-akhir",
      },
    ],
    guideStatus: "ready",
    howToGet: [
      "Login ke [SIMAK UNSRI](https://akademik.unsri.ac.id/login).",
      "Buka menu Bimbingan Tugas Akhir atau langsung buka [halaman Bimbingan Tugas Akhir SIMAK](https://akademik.unsri.ac.id/mahasiswa/bimbingan-tugas-akhir).",
      "Pada tabel Daftar Bimbingan Tugas Akhir Mahasiswa, buka menu Asistensi.",
      "Tambahkan asistensi sesuai kegiatan bimbingan yang pernah dilakukan bersama dosen pembimbing.",
      "Tambahkan minimal 10 asistensi untuk setiap dosen pembimbing.",
      "Jika memiliki dua dosen pembimbing, pastikan masing-masing pembimbing memiliki minimal 10 asistensi.",
      "Tunggu konfirmasi atau persetujuan dari masing-masing dosen pembimbing.",
      "Setelah disetujui, lakukan screenshot daftar asistensi khusus Pembimbing I dan screenshot daftar asistensi khusus Pembimbing II secara terpisah.",
      "Buka fitur generator Kartu Konsultasi Tugas Akhir pada sistem panduan ini.",
      "Isi data mahasiswa, judul tugas akhir, nama pembimbing beserta gelarnya, NIP pembimbing, tanggal, dan masukkan kedua screenshot asistensi.",
      "Generate dan download Kartu Konsultasi Tugas Akhir.",
      "Cetak dokumen hasil generate, lalu temui Koordinator Program Studi untuk meminta tanda tangan.",
      "Jika Koordinator Program Studi memiliki kendala, temui admin program studi untuk meminta bantuan proses tanda tangan.",
      "Setelah dokumen selesai ditandatangani, lakukan capture atau scan dokumen.",
      "Gabungkan hasil capture atau scan menjadi 1 file PDF.",
      "Pastikan file akhir berformat PDF dan ukuran file tidak lebih dari 1 MB.",
    ],
    notes: [
      "Dokumen hasil generate terdiri dari kartu konsultasi Pembimbing I dan Pembimbing II.",
      "Nama dosen pembimbing wajib menyertakan gelar.",
      "Masing-masing pembimbing minimal memiliki 10 asistensi yang sudah disetujui pada SIMAK.",
      "Screenshot asistensi harus dipisahkan per dosen pembimbing.",
      "Proses tanda tangan biasanya membutuhkan waktu sekitar 1-2 hari kerja.",
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
    description:
      "Dokumen tanda terima laporan Kerja Praktik yang sudah ditandatangani pihak terkait dan dicap Perpustakaan Fasilkom.",
    sourceLabel:
      "Panduan Kerja Praktik / Program Studi / Perpustakaan Fasilkom / Pembimbing KP",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    externalLinks: [
      {
        label: "Buka Panduan Kerja Praktik",
        url: "https://drive.google.com/file/d/1RFvFtm_bSxIBltPxzyFUflnfJgGUKE_Z/view",
      },
    ],
    guideStatus: "ready",
    howToGet: [
      "Buka [panduan Kerja Praktik](https://drive.google.com/file/d/1RFvFtm_bSxIBltPxzyFUflnfJgGUKE_Z/view).",
      "Cari bagian dokumen Tanda Terima Laporan KP pada panduan tersebut.",
      "Siapkan dokumen Tanda Terima Laporan KP sesuai format yang tersedia pada panduan Kerja Praktik.",
      "Lengkapi data mahasiswa dan data Kerja Praktik yang dibutuhkan.",
      "Setelah sidang Kerja Praktik selesai, minta tanda tangan kepada pihak-pihak yang diperlukan.",
      "Dokumen ini perlu ditandatangani oleh Admin Program Studi, Perpustakaan Fasilkom, Dosen Pembimbing KP, Pembimbing Lapangan KP, dan Kaprodi atau Koordinator Program Studi.",
      "Selain tanda tangan, dokumen juga perlu diberi cap oleh Perpustakaan Fasilkom.",
      "Pastikan semua tanda tangan yang diperlukan sudah lengkap.",
      "Pastikan cap Perpustakaan Fasilkom sudah tersedia pada dokumen.",
      "Setelah dokumen lengkap ditandatangani dan dicap, lakukan capture atau scan pada dokumen tersebut.",
      "Ubah hasil capture atau scan menjadi file PDF.",
      "Pastikan file akhir berformat PDF dan ukuran file tidak lebih dari 1 MB.",
    ],
    notes: [
      "Dokumen ini seharusnya sudah diselesaikan setelah sidang Kerja Praktik.",
      "Dokumen harus sudah ditandatangani oleh pihak-pihak terkait.",
      "Dokumen harus sudah diberi cap oleh Perpustakaan Fasilkom.",
      "Hasil capture atau scan harus terlihat jelas dan mudah dibaca.",
      "Jika belum memiliki dokumen ini, periksa kembali panduan Kerja Praktik dan hubungi pihak program studi.",
    ],
  },
  {
    id: "dokumen-plagiarisme",
    title: "Dokumen bebas plagiat dan hasil pengecekan plagiat",
    category: "plagiarisme",
    description:
      "Gabungan dokumen terkait surat pernyataan bebas plagiat, lampiran hasil cek plagiat maksimal 20%, dan hasil pengecekan plagiarisme dari perpustakaan.",
    sourceLabel: "Mahasiswa / Admin Program Studi / Kaprodi KA / Perpustakaan",
    acceptedFileType: "pdf",
    maxFileSizeMb: 10,
    maxFileCount: 5,
    isRequired: false,
    canGenerate: false,
    externalLinks: [
      {
        label: "Buka Form Pengecekan Turnitin Perpustakaan",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdjNv7LI9Nxt2y0dd_XS-v9mCECykLu51Bioi2ZaaV6mSV-jQ/viewform",
      },
    ],
    guideStatus: "draft",
    howToGet: [
      "Siapkan surat pernyataan bebas dari plagiat.",
      "Isi data diri mahasiswa sesuai data akademik dan isi informasi laporan Tugas Akhir yang diminta pada surat.",
      "Cantumkan persentase hasil pengecekan plagiarisme atau Turnitin pada surat.",
      "Cetak atau print surat pernyataan tersebut.",
      "Tempelkan materai 10.000 pada bagian tanda tangan.",
      "Tanda tangani surat di atas materai.",
      "Siapkan pasfoto warna ukuran 4x6 sesuai ketentuan.",
      "Jika surat dan pasfoto sudah siap, lakukan capture atau scan jika diperlukan lalu ubah menjadi file PDF.",
      "Siapkan hasil cek plagiarisme yang sesuai dengan nama mahasiswa.",
      "Pastikan skor plagiarisme tidak lebih dari 20%.",
      "Temui admin untuk meminta validasi pada hasil cek plagiarisme.",
      "Pastikan dokumen juga divalidasi oleh Kaprodi KA.",
      "Jika dokumen hasil cek plagiarisme sudah divalidasi dan berbentuk fisik, lakukan capture atau scan lalu ubah menjadi file PDF.",
      "Untuk hasil pengecekan dari perpustakaan, buka form pengajuan pengecekan Turnitin melalui link referensi dokumen ini.",
      "Isi form sesuai data yang diminta dan upload atau lampirkan dokumen yang diminta pada form tersebut.",
      "Pastikan data dan file yang dikirim sudah benar sebelum submit form.",
      "Setelah form dikirim, tunggu hasil pengecekan dari perpustakaan sekitar 1-4 hari kerja.",
      "Setelah hasil pengecekan diterima, simpan dokumen hasil pengecekan tersebut.",
      "Pastikan setiap dokumen tersedia dalam format PDF dan diunggah terpisah sesuai poin yang diminta.",
    ],
    notes: [
      "Panduan ini masih berstatus draft karena template resmi Surat Pernyataan Bebas dari Plagiat belum tersedia.",
      "Upload terpisah menjadi beberapa berkas sesuai poin yang diminta.",
      "Termasuk surat pernyataan bebas plagiat di atas materai 10.000 dan pasfoto warna ukuran 4x6.",
      "Termasuk lampiran hasil cek plagiat dengan skor maksimal 20% yang telah divalidasi oleh admin dan Kaprodi KA.",
      "Termasuk hasil pengecekan plagiarisme dari perpustakaan sebagai berkas tersendiri.",
      "Belum diketahui apakah hasil pengecekan dari perpustakaan perlu diunggah seluruhnya atau hanya bagian tertentu.",
      "Pengajuan pengecekan Turnitin melalui perpustakaan hanya dapat dilakukan sebanyak 3 kali.",
    ],
  },
  {
    id: "forlap-pddikti",
    title: "Capture data Forlap PDDIKTI yang sudah divalidasi oleh BAPSI",
    category: "data-akademik",
    description:
      "Capture atau screenshot data PDDIKTI mahasiswa yang sudah sesuai dan telah divalidasi oleh BAPSI atau KPA UNSRI Bukit Palembang.",
    sourceLabel: "PDDIKTI / BAPSI / KPA UNSRI Bukit Palembang",
    acceptedFileType: "pdf",
    maxFileSizeMb: 1,
    maxFileCount: 1,
    isRequired: false,
    canGenerate: false,
    guideStatus: "draft",
    howToGet: [
      "Pastikan data mahasiswa pada PDDIKTI sudah sesuai.",
      "Lakukan proses validasi data PDDIKTI melalui pihak BAPSI atau KPA UNSRI Bukit Palembang.",
      "Setelah data dinyatakan valid, buka halaman data PDDIKTI yang menampilkan informasi mahasiswa.",
      "Lakukan capture atau screenshot pada halaman PDDIKTI tersebut.",
      "Pastikan hasil capture atau screenshot menampilkan data mahasiswa dengan jelas.",
      "Pastikan data yang ditampilkan merupakan data yang sudah divalidasi oleh BAPSI atau KPA UNSRI Bukit Palembang.",
      "Ubah hasil capture atau screenshot tersebut menjadi file PDF.",
      "Pastikan file akhir berformat PDF dan ukuran file tidak lebih dari 1 MB.",
    ],
    notes: [
      "Panduan ini masih berstatus draft karena detail teknis proses validasi melalui BAPSI atau KPA UNSRI Bukit Palembang dapat disesuaikan kembali jika ada informasi tambahan.",
      "Dokumen berupa capture atau screenshot data PDDIKTI.",
      "Data PDDIKTI harus sudah divalidasi oleh BAPSI atau KPA UNSRI Bukit Palembang.",
      "Hasil capture atau screenshot harus terlihat jelas dan mudah dibaca.",
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
    canGenerate: false,
    guideStatus: "draft",
    howToGet: [
      "Siapkan template Surat Pernyataan Telah Melakukan Pemutakhiran Data.",
      "Isi data diri mahasiswa sesuai data akademik yang benar.",
      "Pastikan isi surat menyatakan bahwa mahasiswa telah melakukan pemutakhiran data dan memastikan data akademik yang tersimpan di UNSRI sudah benar.",
      "Cetak atau print surat pernyataan tersebut.",
      "Tempelkan materai 10.000 pada bagian tanda tangan.",
      "Tanda tangani surat di atas materai.",
      "Setelah surat selesai ditandatangani, lakukan capture atau scan surat tersebut.",
      "Ubah hasil capture atau scan menjadi file PDF.",
      "Pastikan file akhir berformat PDF dan ukuran file tidak lebih dari 1 MB.",
    ],
    notes: [
      "Panduan ini masih berstatus draft karena template resmi atau format final surat belum diketahui.",
      "Dokumen ini direncanakan dapat dibuat melalui fitur generator surat pada sistem panduan.",
      "Surat harus ditandatangani oleh mahasiswa di atas materai 10.000.",
      "Pastikan surat pernyataan yang digunakan sesuai dengan ketentuan terbaru sebelum dicetak dan ditandatangani.",
    ],
  },
];
