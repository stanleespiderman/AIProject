# Exercise images

One image per exercise, named `<exercise-id>.webp` (the id is in `src/data/exercises.ts`), 3:2 landscape (1536×1024).
Style guide: `docs/exercise-image-design.md`.

An image only shows in the app once its id is added to `APPROVED_IMAGE_IDS` in `src/data/approvedImages.ts`.
Approved exercises are also shown first in results when they match the user's filters.
`npm run check:data` fails if a listed id has no file here.
