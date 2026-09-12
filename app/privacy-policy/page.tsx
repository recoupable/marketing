import { permanentRedirect } from "next/navigation";

export default function LegacyLegalPage() {
  permanentRedirect("/privacy");
}
