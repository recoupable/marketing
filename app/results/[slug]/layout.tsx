import { Metadata } from "next";
import { caseStudies } from "@/lib/copy/case-studies";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) return { title: "Case Study | Recoup" };
  return {
    title: study.ogTitle,
    description: study.ogDescription,
    openGraph: {
      title: study.ogTitle,
      description: study.ogDescription,
    },
  };
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
