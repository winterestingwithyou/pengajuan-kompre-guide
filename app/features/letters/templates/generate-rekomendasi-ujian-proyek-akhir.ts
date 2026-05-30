import {
  AlignmentType,
  BorderStyle,
  Document,
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

import type { RekomendasiUjianProyekAkhirValues } from "~/features/letters/schemas/rekomendasi-ujian-proyek-akhir.schema";

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
    children: [cell(label, 1850), cell(":", 180), cell(value, 5700)],
  });
}

function dataTable(values: RekomendasiUjianProyekAkhirValues) {
  return new Table({
    borders: noBorder,
    layout: TableLayoutType.FIXED,
    width: { size: 7730, type: WidthType.DXA },
    rows: [
      dataRow("Nama", values.nama),
      dataRow("NIM", values.nim),
      dataRow("Fakultas", "Ilmu Komputer"),
      dataRow("Program Studi", "Manajemen Informatika"),
      dataRow("Jenjang", "D3"),
      dataRow("Judul Tugas Akhir", values.judulTugasAkhir),
    ],
  });
}

function signatureBlock(
  pembimbingLabel: "Pembimbing I" | "Pembimbing II",
  name: string,
  nip: string,
  values: RekomendasiUjianProyekAkhirValues
) {
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
                children: [new TextRun({ text: pembimbingLabel, ...docText })],
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
                    ...docText,
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: `NIP ${nip}`, bold: true, ...docText })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function recommendationPage(
  values: RekomendasiUjianProyekAkhirValues,
  pembimbingLabel: "Pembimbing I" | "Pembimbing II",
  name: string,
  nip: string,
  withPageBreak = false
) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 420 },
      children: [
        new TextRun({
          text: "SURAT REKOMENDASI  UJIAN PROYEK AKHIR",
          bold: true,
          color: "000000",
          size: 24,
        }),
      ],
    }),
    dataTable(values),
    new Paragraph({
      spacing: { before: 120, after: 120 },
      children: [new TextRun({ text: "", ...docText })],
    }),
    new Paragraph({
      spacing: { after: 360 },
      children: [
        new TextRun({
          text: `Mahasiswa tersebut telah memenuhi persyaratan dan dapat mengikuti Ujian Proyek Akhir pada tahun akademik ${values.tahun}`,
          ...docText,
        }),
      ],
    }),
    signatureBlock(pembimbingLabel, name, nip, values),
    ...(withPageBreak
      ? [
          new Paragraph({
            children: [new PageBreak()],
          }),
        ]
      : []),
  ];
}

export async function generateRekomendasiUjianProyekAkhir(
  values: RekomendasiUjianProyekAkhirValues
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
          ...recommendationPage(
            values,
            "Pembimbing I",
            values.namaPembimbing1,
            values.nipPembimbing1,
            true
          ),
          ...recommendationPage(
            values,
            "Pembimbing II",
            values.namaPembimbing2,
            values.nipPembimbing2
          ),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
