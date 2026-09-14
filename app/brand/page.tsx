import { BrandStudio } from "@/components/brand-studio/BrandStudio";
import { getAssets } from "@/lib/brand-studio/get-assets";
export default function Page() {
  return <BrandStudio key="finals" library="finals" assets={getAssets()} />;
}
