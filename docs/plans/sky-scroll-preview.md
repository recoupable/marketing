# Cloud scroll preview

Preview: `/preview/sky-scroll`. The homepage remains unchanged. This route is excluded from the public registry/sitemap and has noindex metadata.

The opening uses the existing hero, cards, transparent customer logos, mission copy, and subsequent page sections. `SkyHero` is shared with the homepage. `SkyStatement` accepts `animate={false}` so its existing word-reveal controller does not compete with the preview timeline. `SkyContent` can omit the statement already shown in the scene.

## Sequence

- The cloud background fills the viewport from first paint, including the static fallback. Hero content scrolls naturally until the lower hero reaches the reading area.
- The background stays pinned while the cloud image grows. The foreground fades.
- The larger white mission arrives 16svh earlier on desktop (20svh on phones). Each rendered line sharpens from a 7px blur and low opacity to solid white, with the first line readable while later lines are still soft. The reveal spans roughly one viewport unit, then holds before the clouds fade to white. The cloud image moves into view sooner and zooms more gently around its bottom edge to keep clouds visible around the text.
- How we help rises into view during the sky fade. Its wrapper overlaps the last 80svh of the scene on desktop (68svh on phones), removing the empty white gap. Its page, frame, and content backgrounds remain transparent above the shared outgoing sky, so the sky dissolves to white behind the incoming content without a horizontal seam. Individual service cards retain their surfaces. The mission clears before the service content reaches the central reading area. Static and print layouts use normal document flow.

`SkyScrollPreview` uses Motion scroll values for transforms and opacity. `useSkyLineReveal` groups the existing statement word spans by their rendered line positions on resize and font load, then updates their blur and opacity from the same scroll phase without reading layout on scroll. A ResizeObserver measures the responsive hero. Extra travel compensates for the earlier mission entrance, preserving the services handoff timing. The scene clips its overlapping sticky backdrop at its own boundary so the white fade layer cannot cover the following service cards. Native wheel, touch, keyboard, fragment navigation, and reverse scrolling retain their behavior; no scroll interception or animation timers are used.

Phone widths use a shorter scroll distance. Reduced-motion users, very short phone viewports, and pages without JavaScript see a static hero followed by the complete mission. Print removes pinning and restores all content.

## Review

Check the initial hero, the logos before the fade, the full-screen cloud scene, the centered mission, the white reading moment, and the services handoff. Scroll back up as well. At phone widths, verify that the paragraph fits and the card gallery still scrolls horizontally. This remains a prototype until its pacing is approved for the homepage.
