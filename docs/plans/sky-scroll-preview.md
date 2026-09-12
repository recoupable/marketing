# Cloud scroll preview

Preview: `/preview/sky-scroll`. The homepage remains unchanged. This route is excluded from the public registry/sitemap and has noindex metadata.

The opening uses the existing hero, cards, transparent customer logos, mission copy, and subsequent page sections. `SkyHero` is shared with the homepage. `SkyStatement` accepts `animate={false}` so its existing word-reveal controller does not compete with the preview timeline. `SkyContent` can omit the statement already shown in the scene.

## Sequence

- The cloud background fills the viewport from first paint, including the static fallback. Hero content scrolls naturally until the lower hero reaches the reading area.
- The background stays pinned while the cloud image grows. The foreground fades.
- The white mission text rises into the center over 0.85 viewport units of scroll (nearly twice the original reveal distance), then holds against blue before the clouds fade to white.
- The mission fades out with the clouds into white, followed by How we help and the rest of the existing page.

`SkyScrollPreview` uses Motion scroll values for transforms and opacity. A ResizeObserver measures the responsive hero. The scene clips its overlapping sticky backdrop at its own boundary so the white fade layer cannot cover the following service cards. Native wheel, touch, keyboard, fragment navigation, and reverse scrolling retain their behavior; no scroll interception or animation timers are used.

Phone widths use a shorter scroll distance. Reduced-motion users, very short phone viewports, and pages without JavaScript see a static hero followed by the complete mission. Print removes pinning and restores all content.

## Review

Check the initial hero, the logos before the fade, the full-screen cloud scene, the centered mission, the white reading moment, and the services handoff. Scroll back up as well. At phone widths, verify that the paragraph fits and the card gallery still scrolls horizontally. This remains a prototype until its pacing is approved for the homepage.
