import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  routeDiscovery: {
    mode: "initial",
  },
  prerender: {
    paths: [
      "/",
      "/panduan",
      "/checklist",
      "/generator/kartu-konsultasi-tugas-akhir",
      "/generator/rekomendasi-ujian-proyek-akhir",
      "/generator/validasi-usept",
      "/generator/lampiran-pddikti",
      "/generator/surat-pernyataan-bebas-plagiat",
      "/generator/surat-keterangan-bebas-plagiat",
      "/generator/surat-pernyataan-pemutakhiran-data",
    ],
    concurrency: 2,
  },
} satisfies Config;
