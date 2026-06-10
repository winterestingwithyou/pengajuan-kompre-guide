import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  UnderlineType,
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

const documentText = {
  size: 20,
  color: "000000",
};

const pageContentWidthPx = 602;

function borderlessCell(text: string, width: number, bold = false) {
  return new TableCell({
    borders: noBorder,
    width: { size: width, type: WidthType.DXA },
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    children: [
      new Paragraph({
        spacing: { after: 0 },
        children: [new TextRun({ text, bold, ...documentText })],
      }),
    ],
  });
}

function dataRow(label: string, value: string) {
  return new TableRow({
    children: [
      borderlessCell(label, 1300),
      borderlessCell(":", 180),
      borderlessCell(value, 5200),
    ],
  });
}

function dataTable(values: ValidasiUseptGenerateValues) {
  return new Table({
    borders: noBorder,
    layout: TableLayoutType.FIXED,
    width: { size: 6680, type: WidthType.DXA },
    rows: [
      dataRow("Nama", values.nama),
      dataRow("NIM", values.nim),
      dataRow("Fakultas", "Ilmu Komputer"),
      dataRow("Program Studi", "Manajemen Informatika"),
    ],
  });
}

function signatureCell(role: string, name: string, nip: string) {
  return new TableCell({
    borders: noBorder,
    width: { size: 50, type: WidthType.PERCENTAGE },
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: role, ...documentText })],
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: "Manajemen Informatika", ...documentText })],
      }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({
            text: name,
            bold: true,
            underline: { type: UnderlineType.SINGLE },
            ...documentText,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: `NIP ${nip}`, bold: true, ...documentText })],
      }),
    ],
  });
}

export async function generateValidasiUsept(values: ValidasiUseptGenerateValues) {
  const imageWidth = pageContentWidthPx;
  const imageHeight = Math.round(
    (values.screenshot.height / values.screenshot.width) * imageWidth
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 360 },
            children: [
              new TextRun({
                text: "VALIDASI USEPT",
                bold: true,
                color: "000000",
                size: 24,
              }),
            ],
          }),
          dataTable(values),
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
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
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),
          new Table({
            borders: noBorder,
            layout: TableLayoutType.FIXED,
            width: { size: 100, type: WidthType.PERCENTAGE },
            columnWidths: [5233, 5233],
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
