# Exercise images

One image per exercise, named after the exercise id (the id is in `src/data/exercises.ts`):
`public/exercises/<exercise-id>.png` (`.webp`, `.jpg` and `.jpeg` also work).
Landscape 3:2, start and end position side by side. Style and prompts: `docs/exercise-image-design.md`.

Exercises with an image show it at the top of the expanded tile. Exercises without one show no image.
`npm run build:images` (also run before every build) rescans this folder and rewrites `src/data/exerciseImages.ts`.
