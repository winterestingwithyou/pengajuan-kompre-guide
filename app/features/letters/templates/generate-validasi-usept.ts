import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

import type { ValidasiUseptValues } from "~/features/letters/schemas/validasi-usept.schema";

type ValidasiUseptGenerateValues = Omit<ValidasiUseptValues, "screenshotUsept"> & {
  screenshot: {
    data: ArrayBuffer;
    type: "png" | "jpg";
    width: number;
    height: number;
  };
};

const noBorder = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

function dataRow(label: string, value: string) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({ text: label, bold: true }),
      new TextRun({ text: ` : ${value}` }),
    ],
  });
}

function signatureCell(role: string, name: string, nip: string) {
  return new TableCell({
    borders: noBorder,
    width: { size: 50, type: WidthType.PERCENTAGE },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, text: role }),
      new Paragraph({ alignment: AlignmentType.CENTER, text: "Manajemen Informatika" }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: name, bold: true })],
      }),
      new Paragraph({ alignment: AlignmentType.CENTER, text: `NIP ${nip}` }),
    ],
  });
}

export async function generateValidasiUsept(values: ValidasiUseptGenerateValues) {
  const maxWidth = 430;
  const maxHeight = 260;
  const scale = Math.min(maxWidth / values.screenshot.width, maxHeight / values.screenshot.height, 1);
  const imageWidth = Math.round(values.screenshot.width * scale);
  const imageHeight = Math.round(values.screenshot.height * scale);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 360 },
            children: [new TextRun("VALIDASI USEPT")],
          }),
          dataRow("Nama", values.nama),
          dataRow("NIM", values.nim),
          dataRow("Fakultas", "Ilmu Komputer"),
          dataRow("Program Studi", "Manajemen Informatika"),
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                type: values.screenshot.type,
                data: values.screenshot.data,
                transformation: {
                  width: imageWidth,
                  height: imageHeight,
                },
                altText: {
                  title: "Screenshot Nilai USEPT",
                  description: "Screenshot halaman nilai USEPT dari SIMAK UNSRI.",
                  name: "Screenshot Nilai USEPT",
                },
              }),
            ],
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  signatureCell(
                    "Admin Program Studi",
                    "Fitriyanti, S.E.",
                    "198406302025212028"
                  ),
                  signatureCell(
                    "Koordinator Program Studi",
                    "Dr. Abdiansah, S.Kom., M.Cs.",
                    "198410012009121005"
                  ),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
