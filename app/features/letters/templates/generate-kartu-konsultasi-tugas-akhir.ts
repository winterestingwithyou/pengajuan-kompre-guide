import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  Packer,
  PageBreak,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  UnderlineType,
  WidthType,
} from "docx";

import type { KartuKonsultasiTugasAkhirValues } from "~/features/letters/schemas/kartu-konsultasi-tugas-akhir.schema";

type Screenshot = {
  data: ArrayBuffer;
  type: "png" | "jpg";
  width: number;
  height: number;
};

type KartuKonsultasiGenerateValues = Omit<
  KartuKonsultasiTugasAkhirValues,
  "screenshotKonsultasi1" | "screenshotKonsultasi2"
> & {
  screenshotKonsultasi1: Screenshot;
  screenshotKonsultasi2: Screenshot;
};

const noBorder = {
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

const docText = {
  size: 20,
  color: "000000",
};

const pageContentWidthPx = 698;

function cell(text: string, width: number) {
  return new TableCell({
    borders: noBorder,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    children: [
      new Paragraph({
        spacing: { after: 0 },
        children: [new TextRun({ text, ...docText })],
      }),
    ],
  });
}

function dataRow(label: string, value: string) {
  return new TableRow({
    children: [cell(label, 2300), cell(":", 180), cell(value, 5250)],
  });
}

function dataTable(
  values: KartuKonsultasiGenerateValues,
  pembimbingLabel: "Dosen Pembimbing I" | "Dosen Pembimbing II",
  pembimbingName: string
) {
  return new Table({
    borders: noBorder,
    layout: TableLayoutType.FIXED,
    width: { size: 7730, type: WidthType.DXA },
    rows: [
      dataRow("Nama", values.nama),
      dataRow("NIM", values.nim),
      dataRow("Program Studi", "Manajemen Informatika"),
      dataRow("Jenjang", "D3"),
      dataRow("Judul Tugas Akhir", values.judulTugasAkhir),
      dataRow(pembimbingLabel, pembimbingName),
    ],
  });
}

function signatureBlock(values: KartuKonsultasiGenerateValues) {
  const day = values.hariTanggal?.trim() ? values.hariTanggal.trim() : "     ";

  return new Table({
    borders: noBorder,
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [5200, 3600],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorder,
            width: { size: 5200, type: WidthType.DXA },
            children: [new Paragraph({ text: "" })],
          }),
          new TableCell({
            borders: noBorder,
            width: { size: 3600, type: WidthType.DXA },
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: `Palembang, ${day} ${values.bulan} ${values.tahun}`,
                    ...docText,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({ text: "Koordinator Program Studi", ...docText }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: "Manajemen Informatika", ...docText })],
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
                    text: "Dr. Abdiansah, S.Kom., M.Cs.",
                    bold: true,
                    underline: { type: UnderlineType.SINGLE },
                    ...docText,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: "NIP 198410012009121005",
                    bold: true,
                    ...docText,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function consultationPage(
  values: KartuKonsultasiGenerateValues,
  pembimbingLabel: "Dosen Pembimbing I" | "Dosen Pembimbing II",
  pembimbingName: string,
  screenshot: Screenshot,
  withPageBreak = false
) {
  const imageWidth = pageContentWidthPx;
  const imageHeight = Math.round((screenshot.height / screenshot.width) * imageWidth);

  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 420 },
      children: [
        new TextRun({
          text: "KARTU KONSULTASI TUGAS AKHIR",
          bold: true,
          color: "000000",
          size: 24,
        }),
      ],
    }),
    dataTable(values, pembimbingLabel, pembimbingName),
    new Paragraph({ text: "" }),
    new Paragraph({
      alignment: AlignmentType.LEFT,
      children: [
        new ImageRun({
          type: screenshot.type,
          data: screenshot.data,
          transformation: {
            width: imageWidth,
            height: imageHeight,
          },
          altText: {
            title: `Screenshot asistensi ${pembimbingLabel}`,
            description: `Screenshot daftar asistensi SIMAK untuk ${pembimbingLabel}.`,
            name: `Screenshot asistensi ${pembimbingLabel}`,
          },
        }),
      ],
    }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: "" }),
    new Paragraph({ text: "" }),
    signatureBlock(values),
    ...(withPageBreak
      ? [
          new Paragraph({
            children: [new PageBreak()],
          }),
        ]
      : []),
  ];
}

export async function generateKartuKonsultasiTugasAkhir(
  values: KartuKonsultasiGenerateValues
) {
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
          ...consultationPage(
            values,
            "Dosen Pembimbing I",
            values.namaPembimbing1,
            values.screenshotKonsultasi1,
            true
          ),
          ...consultationPage(
            values,
            "Dosen Pembimbing II",
            values.namaPembimbing2,
            values.screenshotKonsultasi2
          ),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
