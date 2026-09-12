import type { Metadata } from "next";
import HomePage from "@/components/home/home-page";
import { withPageMetadata, searchDescription } from "@/lib/seo";
export const metadata: Metadata = withPageMetadata({ title: { absolute: "Recoup: AI transformation for music funds & rightsholders" }, description: searchDescription, alternates: { canonical: "/" } });
export default function Home() { return <HomePage />; }
