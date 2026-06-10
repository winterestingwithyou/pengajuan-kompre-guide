export type LetterTemplate = {
  id: string;
  title: string;
  description: string;
  outputFileName: string;
};

export type RequirementGeneratableLetter = {
  label: string;
  templateId: string;
  description?: string;
};

export type RequirementWithGeneratableLetters = {
  canGenerate: boolean;
  generatableLetters?: RequirementGeneratableLetter[];
};

export const letterTemplates: LetterTemplate[] = [
  {
    id: "lampiran-pddikti",
    title: "Lampiran PDDIKTI",
    description:
      "Generator lampiran PDDIKTI berisi data mahasiswa dan screenshot PDDIKTI untuk kebutuhan kompre D3 Manajemen Informatika Unsri.",
    outputFileName: "lampiran-pddikti.docx",
  },
  {
    id: "kartu-konsultasi-tugas-akhir",
    title: "Kartu Konsultasi Tugas Akhir",
    description:
      "Generator dua halaman kartu konsultasi Pembimbing I dan Pembimbing II berdasarkan screenshot asistensi SIMAK.",
    outputFileName: "kartu-konsultasi-tugas-akhir.docx",
  },
  {
    id: "rekomendasi-ujian-proyek-akhir",
    title: "Surat Rekomendasi Ujian Proyek Akhir",
    description:
      "Generator dua halaman surat rekomendasi Pembimbing I dan Pembimbing II untuk kebutuhan kompre D3 Manajemen Informatika Unsri.",
    outputFileName: "surat-rekomendasi-ujian-proyek-akhir.docx",
  },
  {
    id: "validasi-usept",
    title: "Surat Validasi USEPT",
    description:
      "Generator surat validasi USEPT untuk kebutuhan kompre D3 Manajemen Informatika Unsri.",
    outputFileName: "validasi-usept.docx",
  },
  {
    id: "surat-pernyataan-bebas-plagiat",
    title: "Surat Pernyataan Bebas Plagiat",
    description:
      "Generator surat pernyataan bebas plagiat yang dapat digunakan sebagai salah satu dokumen pengajuan kompre D3 Manajemen Informatika Unsri.",
    outputFileName: "surat-pernyataan-bebas-plagiat.docx",
  },
// {
//   id: "surat-pernyataan-pemutakhiran-data",
//   title: "Surat Pernyataan Pemutakhiran Data",
//   description:
//     "Generator surat pernyataan telah melakukan pemutakhiran data untuk kebutuhan kompre D3 Manajemen Informatika Unsri.",
//   outputFileName: "surat-pernyataan-pemutakhiran-data.docx",
// },
];

export function getLetterTemplate(templateId: string | undefined) {
  return letterTemplates.find((template) => template.id === templateId);
}

export function getRequirementGeneratableLetters(
  requirement: RequirementWithGeneratableLetters
): RequirementGeneratableLetter[] {
  if (!requirement.canGenerate) {
    return [];
  }

  return requirement.generatableLetters ?? [];
}
