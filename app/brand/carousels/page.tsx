import { Suspense } from "react";
import { CarouselStudio } from "@/components/brand-studio/CarouselStudio";
export default function CarouselPage() {
  return (
    <Suspense fallback={<p>Loading carousel experiments…</p>}>
      <CarouselStudio />
    </Suspense>
  );
}
