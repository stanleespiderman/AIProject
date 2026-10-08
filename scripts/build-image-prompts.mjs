#!/usr/bin/env node
/**
 * Builds ChatGPT prompts for exercise illustrations straight from
 * docs/data/whatnext-exercise-form-data.json, so the prompts always match the app data.
 *
 *   node scripts/build-image-prompts.mjs sample
 *       -> writes docs/exercise-image-prompts-sample.md (the 10-exercise test set)
 *   node scripts/build-image-prompts.mjs ids push-up,plank --out docs/some-file.md
 *       -> writes prompts for the given exercise ids
 *
 * Each prompt tells ChatGPT to use the uploaded design guide (docs/exercise-image-design.md)
 * and hands it the exact data, so it has nothing to decide.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "docs/data/whatnext-exercise-form-data.json"), "utf8"));
const byId = new Map(data.exercises.map((e) => [e.id, e]));

/** The test set, with what each one stresses. */
const SAMPLE = [
  ["push-up", "Body flat on the floor, no equipment; the elbow arc must sit on the elbow."],
  ["barbell-back-squat", "Heavy equipment (bar on the back, not the neck), a rack, and two joint angles."],
  ["kettlebell-swing", "Fast, ballistic movement with a flat back."],
  ["pull-up", "Hanging body with the bar overhead."],
  ["dumbbell-fly", "A different camera angle (three-quarter front)."],
  ["band-pull-apart", "Rear camera, so the back muscles face the viewer."],
  ["plank", "A static hold: SET-UP and HOLD instead of START and END."],
  ["cable-triceps-pushdown", "Cable machine and small arm muscles."],
  ["dumbbell-bulgarian-split-squat", "Two legs doing different jobs, with a bench for the rear foot."],
  ["leg-press", "Machine drawn in a reclined pose."],
];

const list = (a) => a.join(", ");

function prompt(e) {
  const im = e.image;
  const key = (e.angleRanges ?? []).find((r) => r.key);
  const lines = [
    `Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.`,
    ``,
    `Create the image for exercise id: ${e.id} (${e.name})`,
    ``,
    `EXERCISE DATA (use exactly this; do not substitute or improvise):`,
    `- Camera: ${im.camera}${im.facing && im.facing !== "as per camera" ? ` (${im.facing})` : ""}`,
    `- Equipment: ${im.equipmentToDraw}`,
    `- Primary muscles (outlined lime, faint tint, dense fibre lines): ${list(im.primaryMusclesToHighlight)}`,
    `- Secondary muscles (thinner dashed lime outlines): ${list(im.secondaryMusclesToHighlight)}. Highlight no other muscle.`,
    `- LEFT panel, ${im.leftPanel.label}: ${im.leftPanel.pose}`,
    `- RIGHT panel, ${im.rightPanel.label}: ${im.rightPanel.pose}`,
    `- Angle labels, LEFT panel: ${list(im.leftPanel.angles)}`,
    `- Angle labels, RIGHT panel: ${list(im.rightPanel.angles)}`,
    `- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.`,
  ];
  if (key) {
    lines.push(
      `- Key angle range: on the ${key.panel.toUpperCase()} panel, at the "${key.label}" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at ${key.min}° and ${key.max}° and the dashed target line at ${key.target}° inside it. Do not write the range as text.`,
    );
  }
  lines.push(
    ``,
    `Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.`,
  );
  return lines.join("\n");
}

function render(entries, { title, intro }) {
  const out = [`# ${title}`, ``, intro, ``];
  for (const [i, [id, focus]] of entries.entries()) {
    const e = byId.get(id);
    if (!e) throw new Error(`Unknown exercise id: ${id}`);
    out.push(`### ${i + 1}. ${id}`, ``);
    if (focus) out.push(`*Tests: ${focus}*  ·  Save as \`${id}.png\``, ``);
    else out.push(`Save as \`${id}.png\``, ``);
    out.push("```", prompt(e), "```", ``);
  }
  return out.join("\n");
}

const [mode, arg, flag, outArg] = process.argv.slice(2);

if (mode === "sample") {
  const header = `Purpose: test the image rules on exercises that stress them in different ways, **before** generating all 168. Each prompt tells ChatGPT to use the uploaded design guide (\`exercise-image-design.md\`) and gives it the exact data, so it has nothing to decide. This file is generated from \`docs/data/whatnext-exercise-form-data.json\` by \`node scripts/build-image-prompts.mjs sample\`; do not edit it by hand.

## How to run the test

1. Open a chat in the ChatGPT Project that has \`exercise-image-design.md\` and \`push-up-approved.webp\` uploaded.
2. Paste **one prompt at a time**, one exercise per message.
3. Save each result as \`<exercise-id>.png\` and judge it with the scoring list below.
4. Send me the failures (which exercise, which rule broke, a screenshot if possible).

## What each exercise tests

| # | Exercise id | What it stresses |
| --- | --- | --- |
${SAMPLE.map(([id, f], i) => `| ${i + 1} | \`${id}\` | ${f} |`).join("\n")}

## Scoring list (score each image pass / fail)

- [ ] Layout: two panels with a thin divider, LEFT = start, RIGHT = end (or set-up / hold); same figure, size and camera; faces left in side views
- [ ] Style: anatomical line-art, light-gray contour on near-black, body interior not filled gray; no 3D shading, gradient or glow
- [ ] Figure: exactly 2 arms, 2 legs, normal hands and feet; no clothes, hair or face
- [ ] Natural pose: a real, slightly imperfect rep, not rigid geometry, and still safe
- [ ] Muscles: the right muscles highlighted; primary = outlined lime with dense fibre lines; secondary = thinner dashed lime; nothing else highlighted
- [ ] Equipment: right type, nothing extra, gripped correctly, mid-gray lines, not lime
- [ ] Angles: labels written with a tilde (\`~90°\`), arcs centred on the named joint, drawn angles within about 10 degrees of the number
- [ ] Key range wedge: a faint wedge on the key joint only (if the prompt asks for one), with no range text
- [ ] Text: no words anywhere except the angle numbers

## Report-back template

\`\`\`
Exercise id:
Rule that failed (layout / style / figure / natural pose / muscles / equipment / angles / wedge / text):
What it looked like:
What I expected:
\`\`\`
`;
  const body = render(SAMPLE, { title: "Sample prompts: 10 very different exercises", intro: header });
  writeFileSync(join(root, "docs/exercise-image-prompts-sample.md"), body + "\n");
  console.log("Wrote docs/exercise-image-prompts-sample.md");
} else if (mode === "ids") {
  const ids = (arg ?? "").split(",").filter(Boolean);
  if (ids.length === 0) throw new Error("Usage: ids <id1,id2,...> --out <file>");
  const out = flag === "--out" ? outArg : "docs/exercise-image-prompts-custom.md";
  writeFileSync(join(root, out), render(ids.map((id) => [id, ""]), { title: "Exercise image prompts", intro: "Generated from `docs/data/whatnext-exercise-form-data.json`." }) + "\n");
  console.log(`Wrote ${out}`);
} else {
  console.error("Usage: build-image-prompts.mjs sample | ids <id1,id2,...> --out <file>");
  process.exit(1);
}
