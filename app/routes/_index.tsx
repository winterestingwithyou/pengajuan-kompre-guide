import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileText,
  FolderCheck,
  HelpCircle,
  ListChecks,
} from "lucide-react";
import { Link } from "react-router";

import type { Route } from "./+types/_index";
import { Section } from "~/components/layout/Section";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GOOGLE_FORM_URL } from "~/lib/constants";
import { letterTemplates } from "~/features/letters/data/letter-templates";
import { kompreRequirements } from "~/features/requirements/data/kompre-requirements";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Panduan Pengajuan Kompre" },
    {
      name: "description",
      content:
        "Panduan, checklist, dan generator surat untuk persiapan pengajuan kompre.",
    },
  ];
}

const flows = [
  "Pahami alur dan daftar dokumen yang diminta.",
  "Siapkan dokumen dari akademik, perpustakaan, laboratorium, dan unit terkait.",
  "Tandai kesiapan dokumen dan simpan link file di checklist lokal.",
  "Generate surat yang bisa dibuat mandiri jika diperlukan.",
  "Lanjutkan pengisian ke Google Form resmi.",
];

const faqs = [
  {
    question: "Apakah aplikasi ini menggantikan Google Form?",
    answer:
      "Tidak. Aplikasi ini hanya membantu persiapan sebelum mahasiswa mengisi Google Form resmi.",
  },
  {
    question: "Apakah file dokumen diupload ke aplikasi?",
    answer:
      "Tidak. Aplikasi hanya menyimpan link lokasi file secara lokal di browser pengguna.",
  },
  {
    question: "Apakah checklist tersimpan setelah reload?",
    answer:
      "Ya. Status checklist, link file, dan catatan lokal disimpan memakai IndexedDB di perangkat yang sama.",
  },
];

const featureCards = [
  {
    icon: FolderCheck,
    title: "Daftar dokumen lengkap",
    description:
      "Lihat seluruh dokumen berdasarkan field upload pada Google Form.",
  },
  {
    icon: ListChecks,
    title: "Checklist dokumen",
    description:
      "Tandai dokumen yang sudah tersedia dan pantau progress kelengkapan.",
  },
  {
    icon: FileText,
    title: "Generator surat",
    description:
      "Buat dokumen awal untuk surat yang bisa disiapkan mandiri.",
  },
];

export default function Index() {
  const generatedCount = kompreRequirements.filter(
    (requirement) => requirement.canGenerate
  ).length;

  return (
    <main className="overflow-hidden">
      <section className="hero-gradient relative border-b border-border/70">
        <div className="absolute inset-x-0 top-0 h-px bg-white/80 dark:bg-white/10" />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:py-20">
          <div className="space-y-8">
            <Badge className="eyebrow-badge" variant="outline">
              Persiapan sebelum Google Form
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal text-balance sm:text-6xl">
                Panduan Pengajuan Kompre
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Siapkan seluruh dokumen pengajuan kompre dengan lebih terarah.
                Gunakan checklist untuk menandai dokumen yang sudah tersedia,
                simpan link file dokumen, dan generate surat yang dapat dibuat
                mandiri sebelum melanjutkan ke Google Form resmi.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="shadow-sm" size="lg">
                <Link to="/checklist">
                  Mulai Checklist
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild className="glass-button" size="lg" variant="outline">
                <Link to="/panduan">Lihat Panduan</Link>
              </Button>
              <Button asChild className="glass-button" size="lg" variant="outline">
                <a href={GOOGLE_FORM_URL} rel="noreferrer" target="_blank">
                  Buka Google Form
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="soft-panel overflow-hidden rounded-lg p-2">
              <img
                alt="Meja kerja abu-abu dengan dokumen dan checklist digital"
                className="aspect-[4/3] w-full rounded-md object-cover dark:brightness-75 dark:contrast-110"
                src="/kompre-hero-gray.png"
              />
            </div>
            <div className="soft-panel absolute -bottom-5 left-5 right-5 rounded-lg p-4 sm:left-auto sm:w-72">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Ringkasan Persiapan</p>
                  <p className="text-xs text-muted-foreground">
                    Dokumen, checklist, generator.
                  </p>
                </div>
                <ClipboardList className="size-5 text-muted-foreground" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ["Dokumen", kompreRequirements.length],
                  ["Generate", generatedCount],
                  ["Template", letterTemplates.length],
                ].map(([label, value]) => (
                  <div className="hairline-panel rounded-md p-3" key={label}>
                    <p className="text-xl font-semibold">{value}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Alur"
        title="Alur Pengajuan Kompre"
        description="Ikuti alur ini sebagai panduan ringan sebelum masuk ke form resmi."
      >
        <div className="grid gap-3 md:grid-cols-5">
          {flows.map((flow, index) => (
            <Card
              className="soft-panel rounded-lg border-neutral-300/70 bg-gradient-to-b from-white to-neutral-100/70 dark:border-neutral-700/70 dark:from-neutral-900 dark:to-neutral-800/70"
              key={flow}
              size="sm"
            >
              <CardHeader>
                <div className="grid size-10 place-items-center rounded-md bg-neutral-900 text-sm font-semibold text-white shadow-sm dark:bg-neutral-100 dark:text-neutral-950">
                  {index + 1}
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-6 text-muted-foreground">{flow}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        className="section-band"
        eyebrow="Ringkasan"
        title="Dokumen yang Perlu Disiapkan"
        description="Dokumen dikelompokkan dari identitas, akademik, tugas akhir, perpustakaan, laboratorium, hingga data akademik."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((item) => (
            <Card className="soft-panel rounded-lg" key={item.title}>
              <CardHeader>
                <div className="soft-icon grid size-11 place-items-center rounded-md">
                  <item.icon className="size-5" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Checklist" title="Fitur Checklist Dokumen">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="soft-panel rounded-lg">
            <CardHeader>
              <div className="soft-icon grid size-11 place-items-center rounded-md">
                <CheckCircle2 className="size-5" />
              </div>
              <CardTitle>Status dan progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground">
                Centang dokumen yang sudah ada, lihat badge status, dan pantau
                progress kelengkapan dari total dokumen.
              </p>
            </CardContent>
          </Card>
          <Card className="soft-panel rounded-lg">
            <CardHeader>
              <div className="soft-icon grid size-11 place-items-center rounded-md">
                <ClipboardList className="size-5" />
              </div>
              <CardTitle>Link lokasi file</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground">
                Simpan link Google Drive, OneDrive, atau lokasi file lain secara
                lokal tanpa upload file ke aplikasi.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        className="section-band"
        eyebrow="Generator"
        title="Generator Surat"
        description="Generator awal berjalan di browser dan menghasilkan file DOCX untuk diperiksa ulang."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {letterTemplates.map((template) => (
            <Card className="soft-panel rounded-lg" key={template.id} size="sm">
              <CardHeader>
                <CardTitle>{template.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-6 text-muted-foreground">
                  {template.description}
                </p>
                <Button asChild className="glass-button" variant="outline">
                  <Link to={`/generator/${template.id}`}>
                    Buka Generator
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="FAQ Singkat">
        <div className="grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <Card className="soft-panel rounded-lg" key={faq.question} size="sm">
              <CardHeader>
                <div className="soft-icon grid size-10 place-items-center rounded-md">
                  <HelpCircle className="size-5" />
                </div>
                <CardTitle>{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-6 text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
