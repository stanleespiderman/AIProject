# Exercise images

Images here show up on the exercise cards automatically.

- Main image: `<exercise-id>.webp` (the id is in `src/data/exercises.ts`).
- Second view (if the exercise has one in the form data): `<exercise-id>--<view>.webp`,
  for example `barbell-bench-press--top.webp`. The card then shows a view toggle.

ChatGPT saves PNGs (about 1.6 MB each); convert them to WebP at quality 90 before committing
(about 80 KB each, visually identical). `npm run dev` and `npm run build` list this folder into
`src/data/exerciseImages.ts` (or run `npm run build:images`), and stop with a clear error if a
file name doesn't match an exercise. Commit the updated `exerciseImages.ts` with the images.

Prompts: `docs/exercise-image-prompts-*.md`; style guide: `docs/exercise-image-design.md`;
generating and checking: `docs/exercise-image-team-readme.md`.
