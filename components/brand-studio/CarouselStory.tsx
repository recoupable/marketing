import story from "@/brand-studio/carousel-content.json";
import rules from "@/brand-studio/carousel-story-rules.json";

export function CarouselTitleStory() {
  return (
    <section
      className="carousel-title-story"
      aria-label="Read the titles as one story"
    >
      <p className="carousel-eyebrow">THE TITLE-ONLY TEST</p>
      <h2>Does this tell the whole story?</h2>
      <ol>
        {story.map((slide, index) => (
          <li key={slide.step}>
            <span aria-hidden="true">0{index + 1}</span>
            <p>{slide.title}</p>
          </li>
        ))}
      </ol>
      <p className="carousel-story-prompt">
        The point and the connections should be clear without supporting copy or
        artwork.
      </p>
    </section>
  );
}

export function CarouselStoryRules() {
  return (
    <details className="carousel-research carousel-story-rules">
      <summary>Story rules · titles first, design second</summary>
      <ol>
        {rules.map((rule) => (
          <li key={rule.title}>
            <h3>{rule.title}</h3>
            <p>{rule.detail}</p>
          </li>
        ))}
      </ol>
      <p>
        This is an editorial judgment, not an automatic score. The current
        reporting story is an illustrative example; a real post needs a sourced
        insight.
      </p>
    </details>
  );
}
