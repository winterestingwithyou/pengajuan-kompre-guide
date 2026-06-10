import {
  AlignmentType,
  BorderStyle,
  Document,
  HeightRule,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  UnderlineType,
  VerticalAlign,
  WidthType,
} from "docx";

import type { SuratPernyataanBebasPlagiatValues } from "~/features/letters/schemas/surat-pernyataan-bebas-plagiat.schema";

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

function textRun(text: string, options: Record<string, unknown> = {}) {
  return new TextRun({ text, ...docText, ...options });
}

function paragraph(text: string, options: Record<string, unknown> = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [textRun(text)],
    ...options,
  });
}

function borderlessCell(children: Paragraph[], width: number) {
  return new TableCell({
    borders: noBorder,
    width: { size: width, type: WidthType.DXA },
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    children,
  });
}

function identityRow(label: string, value: string) {
  return new TableRow({
    children: [
      borderlessCell([paragraph(label, { spacing: { after: 0 } })], 1700),
      borderlessCell([paragraph(":", { spacing: { after: 0 } })], 220),
      borderlessCell([paragraph(value, { spacing: { after: 0 } })], 5600),
    ],
  });
}

function identityTable(values: SuratPernyataanBebasPlagiatValues) {
  return new Table({
    borders: noBorder,
    layout: TableLayoutType.FIXED,
    width: { size: 7520, type: WidthType.DXA },
    rows: [
      identityRow("Nama", values.nama),
      identityRow("NIM", values.nim),
      identityRow("Program Studi", "Manajemen Informatika"),
    ],
  });
}

function numberedItem(number: string, text: string) {
  return new Paragraph({
    spacing: { after: 60 },
    indent: { left: 360, hanging: 360 },
    children: [textRun(`${number}.  ${text}`)],
  });
}

function signatureTable(values: SuratPernyataanBebasPlagiatValues) {
  const day = values.hariTanggal?.trim() || "     ";

  return new Table({
    borders: noBorder,
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [2200, 3500, 3000],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorder,
            width: { size: 2200, type: WidthType.DXA },
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Table({
                alignment: AlignmentType.CENTER,
                layout: TableLayoutType.FIXED,
                width: { size: 1134, type: WidthType.DXA },
                rows: [
                  new TableRow({
                    height: { value: 1701, rule: HeightRule.EXACT },
                    children: [
                      new TableCell({
                        width: { size: 1134, type: WidthType.DXA },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [textRun("Foto 4x6", { size: 18 })],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            borders: noBorder,
            width: { size: 3500, type: WidthType.DXA },
            children: [new Paragraph({ text: "" })],
          }),
          new TableCell({
            borders: noBorder,
            width: { size: 3000, type: WidthType.DXA },
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
            children: [
              paragraph(`Palembang, ${day} ${values.bulan} ${values.tahun}`, {
                alignment: AlignmentType.LEFT,
                spacing: { after: 720 },
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 720 },
                children: [textRun("Materai 10.000", { size: 20 })],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { after: 0 },
                children: [
                  textRun(values.nama, {
                    bold: true,
                    underline: { type: UnderlineType.SINGLE },
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [textRun(`NIM ${values.nim}`, { bold: true })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

export async function generateSuratPernyataanBebasPlagiat(
  values: SuratPernyataanBebasPlagiatValues
) {
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
              textRun("SURAT PERNYATAAN BEBAS PLAGIAT", {
                bold: true,
                size: 30,
              }),
            ],
          }),
          paragraph("Saya yang bertanda tangan dibawah ini :", {
            spacing: { after: 240 },
          }),
          identityTable(values),
          new Paragraph({ text: "" }),
          paragraph("Dengan ini menyatakan bahwa", { spacing: { after: 60 } }),
          numberedItem(
            "1",
            "Dalam penyusun/penulisan projek akhir harus bersifat orisinil dan tidak melakukan plagiarisme baik produk software/hardware."
          ),
          numberedItem(
            "2",
            "Dalam penyelesaian projek akhir dilaksanakan di Laboratorium Fakultas Ilmu Komputer Universitas Sriwijaya dan tidak diselesaikan atau dikerjakan oleh pihak lain diluar civitas akademik Fakultas Ilmu Komputer Universitas Sriwijaya."
          ),
          new Paragraph({ text: "" }),
          paragraph(
            "Demikian pernyataan ini saya buat dengan sebenar-benarnya dan saya bersedia diberikan sanksi apabila dikemudian hari pernyataan saya ini terbukti tidak benar yaitu :",
            { spacing: { after: 60 } }
          ),
          numberedItem(
            "1",
            "Tidak dapat mengikuti ujian komprehensif atau lulus ujian komprehensif."
          ),
          numberedItem(
            "2",
            "Bersedia mengganti judul atau topik projek akhir setelah mendapat persetujuan dari pembimbing projek akhir."
          ),
          new Paragraph({ spacing: { after: 1320 } }),
          signatureTable(values),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
