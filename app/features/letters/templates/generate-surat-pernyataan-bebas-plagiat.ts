import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

import type { SuratPernyataanBebasPlagiatValues } from "~/features/letters/schemas/surat-pernyataan-bebas-plagiat.schema";
import { toCapitalizedTitle } from "~/features/letters/utils/format-title";

export async function generateSuratPernyataanBebasPlagiat(
  values: SuratPernyataanBebasPlagiatValues
) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun("SURAT PERNYATAAN BEBAS PLAGIAT")],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun(
                "Saya yang bertanda tangan di bawah ini menyatakan bahwa dokumen Tugas Akhir yang saya ajukan untuk ujian komprehensif D3 Manajemen Informatika Universitas Sriwijaya merupakan karya saya sendiri dan bebas dari tindakan plagiarisme."
              ),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: `Nama: ${values.nama}` }),
          new Paragraph({ text: `NIM: ${values.nim}` }),
          new Paragraph({ text: `Program Studi: ${values.programStudi}` }),
          new Paragraph({
            text: `Judul Tugas Akhir: ${toCapitalizedTitle(values.judulTugasAkhir)}`,
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun(
                "Demikian surat pernyataan ini dibuat untuk digunakan sebagaimana mestinya. Mahasiswa wajib memeriksa ulang format, materai, tanda tangan, dan ketentuan final sebelum digunakan."
              ),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            text: values.tempatTanggal,
          }),
          new Paragraph({ alignment: AlignmentType.RIGHT, text: "Yang menyatakan," }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),
          new Paragraph({ alignment: AlignmentType.RIGHT, text: values.nama }),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
