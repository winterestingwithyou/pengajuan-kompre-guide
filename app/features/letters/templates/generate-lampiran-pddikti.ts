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
  WidthType,
} from "docx";

import type { LampiranPddiktiValues } from "~/features/letters/schemas/lampiran-pddikti.schema";

type LampiranPddiktiGenerateValues = Omit<
  LampiranPddiktiValues,
  "screenshotPddikti"
> & {
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

const docText = {
  size: 24,
  color: "000000",
};

const screenshotWidthPx = 602;

function textRun(text: string, options: Record<string, unknown> = {}) {
  return new TextRun({ text, ...docText, ...options });
}

function borderlessCell(text: string, width: number) {
  return new TableCell({
    borders: noBorder,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    children: [
      new Paragraph({
        spacing: { after: 0, line: 360 },
        children: [textRun(text)],
      }),
    ],
  });
}

function dataRow(label: string, value: string) {
  return new TableRow({
    children: [
      borderlessCell(label, 1900),
      borderlessCell(":", 220),
      borderlessCell(value, 6900),
    ],
  });
}

function dataTable(values: LampiranPddiktiGenerateValues) {
  return new Table({
    borders: noBorder,
    layout: TableLayoutType.FIXED,
    width: { size: 9020, type: WidthType.DXA },
    rows: [
      dataRow("Nama", values.nama),
      dataRow("NIM", values.nim),
      dataRow("Fakultas", "Ilmu Komputer"),
      dataRow("Program Studi", "Manajemen Informatika"),
    ],
  });
}

export async function generateLampiranPddikti(
  values: LampiranPddiktiGenerateValues
) {
  const screenshotHeight = Math.round(
    (values.screenshot.height / values.screenshot.width) * screenshotWidthPx
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
            spacing: { after: 360, line: 360 },
            children: [
              textRun("LAMPIRAN PDDIKTI", {
                bold: true,
                size: 32,
              }),
            ],
          }),
          dataTable(values),
          new Paragraph({
            spacing: { after: 240, line: 360 },
            children: [],
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { line: 360 },
            children: [
              new ImageRun({
                type: values.screenshot.type,
                data: values.screenshot.data,
                transformation: {
                  width: screenshotWidthPx,
                  height: screenshotHeight,
                },
                altText: {
                  title: "Screenshot PDDIKTI",
                  description: "Screenshot data mahasiswa pada PDDIKTI.",
                  name: "Screenshot PDDIKTI",
                },
              }),
            ],
          }),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
