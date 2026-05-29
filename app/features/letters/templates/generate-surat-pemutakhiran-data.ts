import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

import type { SuratPemutakhiranDataValues } from "~/features/letters/schemas/surat-pemutakhiran-data.schema";

export async function generateSuratPemutakhiranData(
  values: SuratPemutakhiranDataValues
) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun("SURAT PERNYATAAN PEMUTAKHIRAN DATA")],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun(
                "Saya yang bertanda tangan di bawah ini menyatakan bahwa saya telah melakukan pemutakhiran data akademik sesuai ketentuan yang berlaku."
              ),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: `Nama: ${values.nama}` }),
          new Paragraph({ text: `NIM: ${values.nim}` }),
          new Paragraph({ text: `Program Studi: ${values.programStudi}` }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun(
                "Demikian surat pernyataan ini dibuat dengan sebenar-benarnya. Mahasiswa wajib memeriksa ulang format dan ketentuan final sebelum digunakan."
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
