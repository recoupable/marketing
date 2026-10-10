import { withPageMetadata } from "@/lib/seo";
import { Setup } from "./setup";
import "./setup.css";
export const metadata = withPageMetadata({
  title: "Set up your Recoup plugin",
  robots: { index: false, follow: false },
});
export default function SetupPage() {
  return <Setup />;
}
