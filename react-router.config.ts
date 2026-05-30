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
      "/generator/validasi-usept",
      "/generator/surat-pernyataan-bebas-plagiat",
      "/generator/surat-pernyataan-pemutakhiran-data",
    ],
    concurrency: 2,
  },
} satisfies Config;
