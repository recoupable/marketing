# Music video offer visual designs

Created 2026-09-07 **after** the initial implementation in marketing#89. The earlier prose design record was not a visual design deliverable. These files correct that omission without changing the recorded chronology. Design review remains pending.

Open `index.html` in a browser for desktop (1440px) and mobile (390px), each in light and dark. `page.html` is the editable HTML/CSS source, using the repository's existing fonts and approved film posters. Query parameters `theme=light|dark` and `state=error|sending|success` expose the alternatives. Form interactions are local simulations and never call an API.

## Direction and acceptance

An artist film portfolio leads to one quote request. Pixel headlines establish the Recoup identity; film images supply color. Two columns on desktop become one on mobile. Quote scope and permission language stay visible without fixed pricing or delivery promises.

The correction designed here reserves **64px for the fixed site header** before hero padding: desktop hero starts at 136px (its headline is vertically centered beside the film) and mobile H1 starts at 108px; neither may intersect the header. Content width caps at 1200px, with 32px desktop and 24px mobile side padding. Form fields stack on mobile and retain visible boundaries in both themes.

Verify all four views, font/image loading, no horizontal overflow, 52px primary CTA, readable errors, retained fields on retry, and focused confirmation. Header/footer are representative existing chrome, not a redesign; compare the offer area against the implementation. Production copy stays in `lib/copy/music-videos.ts`.

## Required order for future new pages

1. Create the tracking issue and visual designs for desktop/mobile in light/dark, including relevant states.
2. Implement against the designs, open the PR, and immediately add it to the issue matrix.
3. Test the hosted deployment for the PR's current SHA. Post results and hosted screenshots in the PR comment; repeat after behavior or UI changes.

Screenshots of the implementation are verification evidence, not substitute design files. Preview screenshots are hosted in PR comments rather than committed on the feature branch.
