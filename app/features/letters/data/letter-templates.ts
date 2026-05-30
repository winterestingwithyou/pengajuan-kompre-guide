export type LetterTemplate = {
  id: string;
  title: string;
  description: string;
  outputFileName: string;
};

export const letterTemplates: LetterTemplate[] = [
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
  {
    id: "surat-pernyataan-pemutakhiran-data",
    title: "Surat Pernyataan Pemutakhiran Data",
    description:
      "Generator surat pernyataan telah melakukan pemutakhiran data untuk kebutuhan kompre D3 Manajemen Informatika Unsri.",
    outputFileName: "surat-pernyataan-pemutakhiran-data.docx",
  },
];

export function getLetterTemplate(templateId: string | undefined) {
  return letterTemplates.find((template) => template.id === templateId);
}
