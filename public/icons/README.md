# Favicon & PWA icons

All browser and app icons live here. Logos and word marks live in `public/brand/`.

| File | Use |
|------|-----|
| `favicon.ico` | Browser tab, bookmarks (legacy) |
| `favicon-16x16.png` | Small favicon |
| `favicon-32x32.png` | Standard favicon |
| `apple-touch-icon.png` | iOS home screen (e.g. 180×180) |
| `android-chrome-192x192.png` | Android / Chrome PWA |
| `android-chrome-512x512.png` | Android / Chrome PWA (splash) |

Referenced in `app/layout.tsx` metadata. PWA manifest: `public/site.webmanifest` (icon paths point to `/icons/`).
