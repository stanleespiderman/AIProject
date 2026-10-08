/**
 * Build-time data check. Run with `npm run check:data` (also runs before `npm run build`).
 * Fails (exit 1) if the exercise library and its details are out of step.
 */
import { EXERCISES } from "../src/data/exercises";
import { EXERCISE_DETAILS } from "../src/data/exerciseDetails";

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

const ids = EXERCISES.map((e) => e.id);
const idSet = new Set(ids);

// 1. ids are unique
if (idSet.size !== ids.length) {
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  fail(`Duplicate exercise ids: ${[...new Set(dupes)].join(", ")}`);
}

// 2. every exercise has a details entry, and no details entry is orphaned
for (const id of ids) {
  if (!EXERCISE_DETAILS[id]) fail(`No details entry for "${id}" (add it to docs/data/whatnext-exercise-form-data.json, then run npm run build:details)`);
}
for (const id of Object.keys(EXERCISE_DETAILS)) {
  if (!idSet.has(id)) fail(`Details entry "${id}" has no matching exercise in src/data/exercises.ts`);
}

for (const e of EXERCISES) {
  const d = EXERCISE_DETAILS[e.id];
  if (!d) continue;

  // 3. content shape
  if (d.formCues.length !== 3) fail(`${e.id}: expected 3 form cues, got ${d.formCues.length}`);
  if (d.setup.length === 0) fail(`${e.id}: setup is empty`);
  if (d.execution.length === 0) fail(`${e.id}: execution is empty`);
  if (d.commonMistakes.some((m) => !m.mistake || !m.fix)) fail(`${e.id}: a common mistake is missing its mistake or fix`);

  // 4. image spec is complete and consistent
  const img = d.image;
  const expectedLabels = d.isStaticHold ? ["SET-UP", "HOLD"] : ["START", "END"];
  if (img.leftPanel.label !== expectedLabels[0] || img.rightPanel.label !== expectedLabels[1]) {
    fail(`${e.id}: panel labels should be ${expectedLabels.join(" / ")}, got ${img.leftPanel.label} / ${img.rightPanel.label}`);
  }
  if (img.primaryMusclesToHighlight.length === 0) fail(`${e.id}: no primary muscle to highlight`);
  if (img.leftPanel.angles.length === 0 || img.rightPanel.angles.length === 0) fail(`${e.id}: each image panel needs at least one angle label`);

  // 4b. angle ranges (optional per exercise): sane numbers, one key angle, labels match the image
  if (d.angleRanges) {
    const keys = d.angleRanges.filter((r) => r.key).length;
    if (keys !== 1) fail(`${e.id}: angleRanges needs exactly one "key" angle, found ${keys}`);
    for (const r of d.angleRanges) {
      if (!(r.min <= r.target && r.target <= r.max)) fail(`${e.id}: "${r.label}" needs min <= target <= max (got ${r.min}/${r.target}/${r.max})`);
      if (r.min < 0 || r.max > 180) fail(`${e.id}: "${r.label}" range must stay within 0 to 180 degrees`);
      const shown = r.panel === "left" ? img.leftPanel.angles : img.rightPanel.angles;
      if (!shown.includes(r.label)) fail(`${e.id}: angle label "${r.label}" is not on the ${r.panel} image panel`);
    }
  }
}

// 5. video links stay as YouTube searches (never invented video ids)
const SEARCH = "https://www.youtube.com/results?search_query=";
for (const e of EXERCISES) {
  if (!e.videoUrl.startsWith(SEARCH)) fail(`${e.id}: videoUrl must be a YouTube search URL, got ${e.videoUrl}`);
}

if (errors.length > 0) {
  console.error(`\nExercise data check FAILED (${errors.length} problem${errors.length === 1 ? "" : "s"}):\n`);
  for (const msg of errors) console.error(`  - ${msg}`);
  console.error("");
  process.exit(1);
}

const withRanges = EXERCISES.filter((e) => e.angleRanges?.length).length;
const pending = EXERCISES.filter((e) => e.reviewStatus !== "approved").length;
console.log(`Exercise data OK: ${EXERCISES.length} exercises, all with details. ${withRanges} with angle ranges. Trainer review pending on ${pending}.`);
