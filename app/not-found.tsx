import { PageHero, PageButton } from "@/components/sky/page-ui";
export default function NotFound() {
  return <div className="sky-subpage"><PageHero eyebrow="404 / PAGE NOT FOUND" title="This page isn’t here." description="Let’s get you back to Recoup."><PageButton href="/">Back to Recoup</PageButton><PageButton href="/agents" secondary>Search Recoup</PageButton></PageHero></div>;
}
