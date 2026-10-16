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
  ["push-up", "Body flat on the floor, no equipment; the shoulder-hip-ankle line must really be straight."],
  ["barbell-back-squat", "Heavy equipment (bar on the back, not the neck), a rack, and a dashed bar-path reference line."],
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

/**
 * Fallback for exercises without hand-written `alignment` lines: turn each angle label
 * ("knee ~90°", "torso lean ~40° from vertical") into the body lines that meet at that joint.
 * Hand-written lines are better (they say what must be straight, vertical or level), so add
 * them to the JSON before generating an exercise for real.
 */
function deriveAlignment(angles) {
  const out = [];
  for (const label of angles) {
    const a = label.toLowerCase();
    const ref = a.includes("vertical") ? "vertical" : a.includes("horizontal") || a.includes("floor") ? "horizontal" : null;
    const withRef = (line) => (ref ? `${line}, with a dashed ${ref} reference line` : line);
    let m;
    if ((m = a.match(/^(front |back )?knee/))) out.push(`${m[1] ?? ""}thigh and shin lines (dots on hip, ${m[1] ?? ""}knee and ankle)`);
    else if (a.startsWith("elbow")) out.push("upper arm and forearm lines (dots on shoulder, elbow and wrist)");
    else if (a.startsWith("ankle")) out.push("shin and foot lines (dots on knee, ankle and toes)");
    else if (a.startsWith("hip extension")) out.push(withRef("thigh line from hip to knee (dots on hip and knee)"));
    else if (a.startsWith("hip")) out.push("torso and thigh lines (dots on shoulder, hip and knee)");
    else if (/^(arms?|shoulder) /.test(a)) out.push("arm line from shoulder to hand, and torso line from shoulder to hip (dots on hand, shoulder and hip)");
    else if (a.startsWith("torso rotated")) out.push("one line across both shoulders, showing the rotation (dots on both shoulders)");
    else if (a.startsWith("torso")) out.push(withRef("torso line from hip to shoulder (dots on hip and shoulder)"));
    else if (a.startsWith("body")) out.push(withRef("one line along the body from shoulder through hip to ankle (dots on shoulder, hip and ankle)"));
    else if (a.startsWith("leg")) out.push(withRef("leg line from hip to ankle (dots on hip and ankle)"));
    else if (a.startsWith("thighs")) out.push("a line along each thigh from hip to knee (dots on both knees)");
    else if (a.startsWith("bench")) out.push("a dashed reference line along the bench back pad");
    else throw new Error(`No alignment rule for angle label "${label}": add alignment lines to the JSON`);
  }
  return [...new Set(out)].slice(0, 3);
}

const alignmentOf = (panel) => panel.alignment ?? deriveAlignment(panel.angles);
const bullets = (a) => a.map((x) => `    - ${x}`);

function prompt(e) {
  const im = e.image;
  const lines = [
    `Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.`,
    ``,
    `Create the image for exercise id: ${e.id} (${e.name})`,
    ``,
    `EXERCISE DATA (use exactly this; do not substitute or improvise):`,
    `- Camera: ${im.camera}${im.facing && im.facing !== "as per camera" ? ` (${im.facing})` : ""}. Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.`,
    `- Equipment: ${im.equipmentToDraw}`,
    `- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.`,
    `- Primary muscles (outlined lime, faint tint, dense fibre lines): ${list(im.primaryMusclesToHighlight)}`,
    `- Secondary muscles (thinner dashed lime outlines): ${list(im.secondaryMusclesToHighlight)}. Highlight no other muscle.`,
    `- LEFT panel, ${im.leftPanel.label}: ${im.leftPanel.pose}`,
    `- RIGHT panel, ${im.rightPanel.label}: ${im.rightPanel.pose}`,
    `- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):`,
    ...bullets(alignmentOf(im.leftPanel)),
    `- Alignment lines, RIGHT panel (same style):`,
    ...bullets(alignmentOf(im.rightPanel)),
    `- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.`,
    ``,
    `Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.`,
  ];
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

- [ ] Layout: two panels with a thin divider, LEFT = start, RIGHT = end (or set-up / hold); same figure and size, exactly the same camera viewpoint in both panels; faces left in side views
- [ ] Style: anatomical line-art, light-gray contour on near-black, body interior not filled gray; no 3D shading, gradient or glow
- [ ] Figure: exactly 2 arms, 2 legs, normal hands and feet; no clothes, hair or face
- [ ] Natural pose: a real, slightly imperfect rep, not rigid geometry, and still safe
- [ ] Muscles: the right muscles highlighted; primary = outlined lime with dense fibre lines; secondary = thinner dashed lime; nothing else highlighted
- [ ] Equipment: right type, nothing extra, mid-gray lines, not lime; hands wrapped around it, nothing floating or passing through the body
- [ ] Alignment: only the listed lines; dots on joint centres; solid for body lines, dashed only for reference lines; lines called straight, vertical or level really look that way on the body
- [ ] Text: no text at all (no numbers, degree signs or angle arcs)

## Report-back template

\`\`\`
Exercise id:
Rule that failed (layout / style / figure / natural pose / muscles / equipment / alignment / text):
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
  writeFileSync(join(root, out), render(ids.map((id) => [id, ""]), {
      title: "Exercise image prompts",
      intro: "Generated from `docs/data/whatnext-exercise-form-data.json` by `scripts/build-image-prompts.mjs`; do not edit by hand.\n\nPaste one prompt per new chat in the ChatGPT Project (with `exercise-image-design.md` and the reference image uploaded), on a Thinking model. Judge each result against the checklist in section 9 of `exercise-image-design.md` (the team pack README has the full checking steps), then convert the PNG to WebP for `public/exercises/` (see the README there).",
    }) + "\n");
  console.log(`Wrote ${out}`);
} else {
  console.error("Usage: build-image-prompts.mjs sample | ids <id1,id2,...> --out <file>");
  process.exit(1);
}
