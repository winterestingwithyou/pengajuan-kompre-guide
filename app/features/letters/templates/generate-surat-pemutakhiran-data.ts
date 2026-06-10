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

import type { SuratPemutakhiranDataValues } from "~/features/letters/schemas/surat-pemutakhiran-data.schema";

type ScreenshotPayload = {
  data: ArrayBuffer;
  type: "png" | "jpg";
  width: number;
  height: number;
};

export type SuratPemutakhiranDataGenerateValues = Omit<
  SuratPemutakhiranDataValues,
  | "screenshotDataDiri"
  | "screenshotAkademik"
  | "screenshotAlamat"
  | "screenshotOrangTua"
  | "screenshotWali"
  | "screenshotPerguruanTinggiAsal"
  | "screenshotRiwayatPendidikan"
> & {
  screenshots: {
    dataDiri: ScreenshotPayload;
    akademik: ScreenshotPayload;
    alamat: ScreenshotPayload;
    orangTua: ScreenshotPayload;
    wali: ScreenshotPayload;
    perguruanTinggiAsal: ScreenshotPayload;
    riwayatPendidikan: ScreenshotPayload;
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

const screenshotWidthPx = 492;

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

function identityTable(values: SuratPemutakhiranDataGenerateValues) {
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

function screenshotSection(label: string, screenshot: ScreenshotPayload) {
  const imageHeight = Math.round(
    (screenshot.height / screenshot.width) * screenshotWidthPx
  );

  return [
    new Paragraph({
      spacing: { before: 120, after: 120, line: 360 },
      numbering: { reference: "biodata-menu-list", level: 0 },
      children: [textRun(label, { bold: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240, line: 360 },
      children: [
        new ImageRun({
          type: screenshot.type,
          data: screenshot.data,
          transformation: {
            width: screenshotWidthPx,
            height: imageHeight,
          },
          altText: {
            title: `Screenshot ${label}`,
            description: `Screenshot menu ${label} pada Biodata SIMAK UNSRI.`,
            name: `Screenshot ${label}`,
          },
        }),
      ],
    }),
  ];
}

function signatureParagraph(text = "", options: Record<string, unknown> = {}) {
  return new Paragraph({
    indent: { left: 6379 },
    spacing: { after: 120, line: 360 },
    children: text ? [textRun(text, options)] : [],
  });
}

function signature(values: SuratPemutakhiranDataGenerateValues) {
  const day = values.hariTanggal?.trim() || "     ";

  return [
    signatureParagraph(`Palembang, ${day} ${values.bulan} ${values.tahun}`),
    signatureParagraph("Yang Menyatakan,"),
    signatureParagraph(),
    signatureParagraph(),
    signatureParagraph(),
    signatureParagraph(values.nama, {
      bold: true,
      underline: { type: UnderlineType.SINGLE },
    }),
    signatureParagraph(`NIM ${values.nim}`, { bold: true }),
  ];
}

export async function generateSuratPemutakhiranData(
  values: SuratPemutakhiranDataGenerateValues
) {
  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "biodata-menu-list",
          levels: [
            {
              level: 0,
              format: "decimal",
              text: "%1.",
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: 284, hanging: 284 },
                },
              },
            },
          ],
        },
      ],
    },
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
              textRun("SURAT PERNYATAAN PEMUTAKHIRAN DATA", {
                bold: true,
                size: 32,
              }),
            ],
          }),
          paragraph("Saya yang bertanda tangan dibawah ini:"),
          identityTable(values),
          new Paragraph({ spacing: { after: 120, line: 360 } }),
          paragraph(
            "Dengan ini saya menyatakan bahwa data pribadi yang tercantum pada menu Biodata di SIMAK 3.0 Universitas Sriwijaya telah saya periksa dan telah sesuai dengan data diri saya yang sebenarnya. Sebagai bukti, berikut saya lampirkan tangkapan layar dari setiap bagian menu Biodata pada SIMAK 3.0 Universitas Sriwijaya.",
            {
              indent: { firstLine: 567 },
            }
          ),
          ...screenshotSection("Data Diri", values.screenshots.dataDiri),
          ...screenshotSection("Akademik", values.screenshots.akademik),
          ...screenshotSection("Alamat", values.screenshots.alamat),
          new Paragraph({ children: [new PageBreak()] }),
          ...screenshotSection("Orang Tua", values.screenshots.orangTua),
          ...screenshotSection("Wali", values.screenshots.wali),
          new Paragraph({ children: [new PageBreak()] }),
          ...screenshotSection(
            "Perguruan Tinggi Asal",
            values.screenshots.perguruanTinggiAsal
          ),
          ...screenshotSection(
            "Riwayat Pendidikan",
            values.screenshots.riwayatPendidikan
          ),
          ...signature(values),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}
