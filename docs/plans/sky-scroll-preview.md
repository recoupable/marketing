# Cloud scroll preview

Preview: `/preview/sky-scroll`. The homepage remains unchanged. This route is excluded from the public registry/sitemap and has noindex metadata.

The opening uses the existing hero, cards, transparent customer logos, mission copy, and subsequent page sections. `SkyHero` is shared with the homepage. `SkyStatement` accepts `animate={false}` so its existing word-reveal controller does not compete with the preview timeline. `SkyContent` can omit the statement already shown in the scene.

## Sequence

- Hero content scrolls naturally until the lower hero reaches the reading area.
- The background stays pinned; its side margins and corner radius open to the viewport while the cloud image grows. The foreground fades.
- The mission rises into the center and stays readable while the clouds fade to white. Dark text avoids the low-contrast midpoint of interpolating white text to black.
- The mission scrolls away naturally on white, followed by How we help and the rest of the existing page.

`SkyScrollPreview` uses Motion scroll values for transforms and opacity. A ResizeObserver measures the responsive hero. Native wheel, touch, keyboard, fragment navigation, and reverse scrolling retain their behavior; no scroll interception or animation timers are used.

Phone widths use a shorter scroll distance. Reduced-motion users, very short phone viewports, and pages without JavaScript see a static hero followed by the complete mission. Print removes pinning and restores all content.

## Review

Check the initial hero, the logos before the fade, the full-screen cloud scene, the centered mission, the white reading moment, and the services handoff. Scroll back up as well. At phone widths, verify that the paragraph fits and the card gallery still scrolls horizontally. This remains a prototype until its pacing is approved for the homepage.
