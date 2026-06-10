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
  VerticalAlignTable,
  WidthType,
} from "docx";

import type { SuratKeteranganBebasPlagiatValues } from "~/features/letters/schemas/surat-keterangan-bebas-plagiat.schema";

type ScreenshotPayload = {
  data: ArrayBuffer;
  type: "png" | "jpg";
  width: number;
  height: number;
};

type SuratKeteranganBebasPlagiatGenerateValues = Omit<
  SuratKeteranganBebasPlagiatValues,
  "screenshotTurnitinIdentitas" | "screenshotTurnitinSimilarity"
> & {
  screenshots: {
    identitas: ScreenshotPayload;
    similarity: ScreenshotPayload;
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

const screenshotWidthPx = 454;
const headerWidth = 9020;
const logoWidthPx = 72;
const logoHeightPx = 68;

function textRun(text: string, options: Record<string, unknown> = {}) {
  return new TextRun({ text, ...docText, ...options });
}

function paragraph(text: string, options: Record<string, unknown> = {}) {
  return new Paragraph({
    spacing: { after: 120, line: 360 },
    children: [textRun(text)],
    ...options,
  });
}

function headerParagraph(text: string, size = 20, bold = false) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [textRun(text, { size, bold })],
  });
}

async function loadUnsriLogo() {
  const response = await fetch("/unsri-logo.png");

  if (!response.ok) {
    throw new Error("Logo UNSRI tidak dapat dimuat.");
  }

  return response.arrayBuffer();
}

function headerTable(logoData: ArrayBuffer) {
  return new Table({
    borders: noBorder,
    layout: TableLayoutType.FIXED,
    width: { size: headerWidth, type: WidthType.DXA },
    columnWidths: [1300, 6420, 1300],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorder,
            verticalAlign: VerticalAlignTable.CENTER,
            width: { size: 1300, type: WidthType.DXA },
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new ImageRun({
                    type: "png",
                    data: logoData,
                    transformation: {
                      width: logoWidthPx,
                      height: logoHeightPx,
                    },
                    altText: {
                      title: "Logo Universitas Sriwijaya",
                      description: "Logo Universitas Sriwijaya pada header surat.",
                      name: "Logo Universitas Sriwijaya",
                    },
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            borders: noBorder,
            verticalAlign: VerticalAlignTable.CENTER,
            width: { size: 6420, type: WidthType.DXA },
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
            children: [
              headerParagraph("KEMENTERIAN PENDIDIKAN TINGGI,", 18),
              headerParagraph("SAINS, DAN TEKNOLOGI", 18),
              headerParagraph("UNIVERSITAS SRIWIJAYA", 18),
              headerParagraph("FAKULTAS ILMU KOMPUTER", 18, true),
              headerParagraph("PROGRAM STUDI MANAJEMEN INFORMATIKA", 18, true),
              headerParagraph(
                "Kampus Unsri, Jalan Srijaya Negara Bukit Besar Palembang, Kode Pos : 30139",
                14
              ),
              headerParagraph(
                "Telepon (0711) 379249, Pos-el : humas@ilkom.unsri.ac.id",
                14
              ),
            ],
          }),
          new TableCell({
            borders: noBorder,
            width: { size: 1300, type: WidthType.DXA },
            children: [new Paragraph({ text: "" })],
          }),
        ],
      }),
    ],
  });
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

function identityRow(label: string, value: string) {
  return new TableRow({
    children: [
      borderlessCell(label, 1900),
      borderlessCell(":", 220),
      borderlessCell(value, 6900),
    ],
  });
}

function identityTable(values: SuratKeteranganBebasPlagiatGenerateValues) {
  return new Table({
    borders: noBorder,
    layout: TableLayoutType.FIXED,
    width: { size: 9020, type: WidthType.DXA },
    rows: [
      identityRow("Nama", values.nama),
      identityRow("NIM", values.nim),
      identityRow("Fakultas", "Ilmu Komputer"),
      identityRow("Program Studi", "Manajemen Informatika"),
    ],
  });
}

function screenshotParagraph(screenshot: ScreenshotPayload, title: string) {
  const imageHeight = Math.round(
    (screenshot.height / screenshot.width) * screenshotWidthPx
  );

  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 240, line: 360 },
    children: [
      new ImageRun({
        type: screenshot.type,
        data: screenshot.data,
        transformation: {
          width: screenshotWidthPx,
          height: imageHeight,
        },
        altText: {
          title,
          description: title,
          name: title,
        },
      }),
    ],
  });
}

function signatureCell(role: string, name: string, nip: string) {
  return new TableCell({
    borders: noBorder,
    width: { size: 50, type: WidthType.PERCENTAGE },
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    children: [
      paragraph(role, { spacing: { after: 0 } }),
      paragraph("Manajemen Informatika", { spacing: { after: 0 } }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [
          textRun(name, {
            bold: true,
            underline: { type: UnderlineType.SINGLE },
          }),
        ],
      }),
      new Paragraph({
        children: [textRun(`NIP ${nip}`, { bold: true })],
      }),
    ],
  });
}

function signatureTable() {
  return new Table({
    borders: noBorder,
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [5233, 5233],
    rows: [
      new TableRow({
        children: [
          signatureCell("Admin Program Studi", "Fitriyanti, S.E.", "198406302025212028"),
          signatureCell(
            "Koordinator Program Studi",
            "Dr. Abdiansah, S.Kom., M.Cs.",
            "198410012009121005"
          ),
        ],
      }),
    ],
  });
}

export async function generateSuratKeteranganBebasPlagiat(
  values: SuratKeteranganBebasPlagiatGenerateValues
) {
  const logoData = await loadUnsriLogo();

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
          headerTable(logoData),
          new Paragraph({
            border: {
              bottom: {
                color: "000000",
                space: 1,
                style: BorderStyle.SINGLE,
                size: 8,
              },
            },
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 360, line: 360 },
            children: [
              textRun("LAMPIRAN HASIL CEK PLAGIAT", {
                bold: true,
                size: 32,
              }),
            ],
          }),
          identityTable(values),
          screenshotParagraph(
            values.screenshots.identitas,
            "Halaman pertama hasil Turnitin berisi nama mahasiswa dan judul TA"
          ),
          new Paragraph({ children: [new PageBreak()] }),
          screenshotParagraph(
            values.screenshots.similarity,
            "Halaman similarity keseluruhan hasil Turnitin"
          ),
          signatureTable(),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
