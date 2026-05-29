export type LetterTemplate = {
  id: string;
  title: string;
  description: string;
  outputFileName: string;
};

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

export function getLetterTemplate(templateId: string | undefined) {
  return letterTemplates.find((template) => template.id === templateId);
}
