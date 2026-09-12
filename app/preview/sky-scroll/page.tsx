import type { Metadata } from "next";
import { SkyHero } from "@/components/home/sky-hero";
import { SkyContent } from "@/components/home/sky-content";
import { SkyStatement } from "@/components/home/sky-statement";
import { SkyScrollPreview } from "@/components/home/sky-scroll-preview";
import "@/components/home/sky.css";

export const metadata: Metadata = {
  title: "Recoup — Cloud scroll preview",
  description: "An experimental scroll journey from the Recoup hero, through the clouds and our mission, into how we help music companies.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function SkyScrollPage() {
  return <SkyScrollPreview hero={<SkyHero />} statement={<SkyStatement animate={false} />}>
    <SkyContent includeStatement={false} />
  </SkyScrollPreview>;
}
