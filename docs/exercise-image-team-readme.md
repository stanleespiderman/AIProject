# WhatNext? exercise images: how to generate and check them

You'll be making exercise illustrations for the WhatNext? gym app with ChatGPT. Each image shows one exercise in two panels: the start position on the left and the end position on the right. The working muscles are highlighted in lime, and white **alignment lines** (dots on the joints joined by lines) show what must stay straight, vertical or level.

This pack covers **40 exercises (22 chest and 18 back), plus 4 second-view images**, for 44 images in all. A second view is a second image of the same exercise from another camera, for form that one camera can't show (section 3b). Look at `3-approved-examples/` first. Those 10 images passed review, and every new image should look like they do.

---

## What's in this pack

| Folder / file | What it is |
|---|---|
| `README.md` | This file. |
| `1-upload-to-chatgpt/exercise-image-design.md` | The style guide. ChatGPT needs it for every image. |
| `1-upload-to-chatgpt/push-up-approved.webp` | The style reference image (the approved push-up, with alignment lines). |
| `2-prompts/chest-prompts.md` | 22 ready-to-paste prompts, plus 4 second-view prompts (numbered like `4b`, and `23` for the push-up). |
| `2-prompts/back-prompts.md` | 18 ready-to-paste prompts. |
| `3-approved-examples/` | The 10 approved images: the quality bar. |
| `tracker.csv` | One row per exercise. Fill it in as you go (open it in Excel or Google Sheets). |

---

## 1. One-time setup

1. In ChatGPT, create a **Project** (for example "WhatNext images").
2. Upload **both files** from `1-upload-to-chatgpt/` to the Project's files.
   - If you already have an older `push-up-approved.webp` in the Project (one with angle numbers like `~90°`), delete it and upload this one instead.
3. **Model:** pick a **Thinking** model in the model picker (Sol, or the standard Thinking option). Thinking lets ChatGPT check its own image against the guide before showing it. Don't use Instant or Luna.
   - Only switch to **Astra** for a single exercise that keeps failing (see step 5).
   - Use the same model for the whole batch, so the style stays consistent.

---

## 2. Start with the trial (8 images), not the whole batch

Before doing everything, make these 8 and send them for review. They cover the new kinds of lines and the new second views. If they pass, do the rest. If they fail, the prompts get fixed first, which saves you redoing 44 images.

| Batch | Trial image (prompt number) | What it tests |
|---|---|---|
| Chest | `barbell-bench-press` (#4) | The arm "stacked" in a vertical line under the bar |
| Chest | `barbell-bench-press--top` (#4b) | The first **top view**: elbows in an arrow shape, not a T |
| Chest | `cable-crossover` (#8) | Three-quarter front view: the elbow bend must stay the same at the end |
| Chest | `cable-crossover--side` (#8b) | A side view as the second view: the forward lean |
| Chest | `chest-dip` (#17) | Hanging between high bars with the feet off the floor |
| Back | `one-arm-dumbbell-row` (#1) | Flat back plus a rowing arm |
| Back | `lat-pulldown` (#10) | Arms overhead, then pulled down |
| Back | `chin-up` (#15) | Hanging from a bar (the hardest kind so far) |

---

## 3. Making each image

1. Open a **new chat inside the Project** for every exercise. Don't reuse a chat: ChatGPT carries over things like equipment and camera from the previous image.
2. Open the prompts file and copy **one whole prompt**, everything inside one grey box from `Use the attached design guide…` to `…no text of any kind in the image.`
3. Paste it, send, and wait. Don't add your own words, and don't paste two prompts at once.
4. Check the image (section 4). If it passes, download it and name it exactly **`<exercise-id>.png`**, for example `barbell-bench-press.png`. The id is in the prompt's heading and in `tracker.csv`.

### 3b. Second views

Some exercises have a second prompt right after the main one, with a heading like `4b. barbell-bench-press: second view (top)`. It makes a **separate image** of the same exercise from another camera:
- **Top view:** looking straight down from above, head at the left. Used for the bench press, dumbbell bench press and push-up, to show how far the elbows flare.
- **Side view:** used for the cable crossover, to show the forward lean.

Make it in **its own new chat**, just like a main image. Save it as **`<exercise-id>--<view>.png`** (two hyphens), for example `barbell-bench-press--top.png`. It must look like the same athlete, equipment and style as the main image, and only the camera changes.

---

## 4. Checking an image (do every check, every time)

Have the image open next to one of the approved examples. Fail the image if any of these is wrong.

**Layout**
- [ ] Two panels with a thin divider line: **start on the left, end on the right** (for holds, set-up and hold).
- [ ] **Same camera in both panels.** It must not be a side view in one panel and a back view in the other.
- [ ] In side views the athlete **faces left**.

**Figure and style**
- [ ] Line-art body on a near-black background, matching the examples. No cartoon look, photo look or coloured background.
- [ ] Exactly 2 arms and 2 legs, normal hands and feet, no extra or merged fingers. No hair, face or clothes.

**Equipment** (the most common failure so far)
- [ ] The right equipment and nothing extra: the right bench type (flat vs incline), the right machine.
- [ ] **Hands actually hold it.** A dumbbell, bar, handle or band must be gripped, not floating near the hand.
- [ ] It's in the right place, for example a bar on the upper back and not the neck, or a band in front of the body. Nothing passes through the body.

**Muscles**
- [ ] Only the muscles named in the prompt are lime. Primary muscles are solid lime; secondary muscles are thinner, dashed lime.
- [ ] They're on the right part of the body. For example, the lats are the wide muscles on the sides of the back, and the triceps are on the back of the upper arm.

**Alignment lines** (the new feature: check carefully)
- [ ] Only the lines listed in the prompt are drawn: white dots on the joints, solid white lines between them. Dashed lines are used only for the reference line the prompt asks for.
- [ ] **The lines tell the truth.** If the prompt says a line is straight, vertical or level, it must look that way **and the body must actually follow it**. For example, a "straight line from shoulder through hip to ankle" with sagging hips is a fail.
- [ ] No messy cluster of lines all coming out of one dot in the same direction.
- [ ] Every line ends at the joints the prompt names. For example, a torso line runs from the hip to the shoulder or neck, never to a hand.

**Text**
- [ ] **No text, numbers, degree signs (°) or angle arcs anywhere.** Watch for these especially on the incline exercises, whose prompts mention bench angles in degrees.

**Safety** (these images teach form, so a wrong picture can hurt someone)
- [ ] No rounded back on rows or hinges. No bar on the neck. No knees caving in. No hips sagging in push-ups.

**Form actually matches the exercise** (read the pose lines in the prompt, then look again)
- [ ] The movement is the one named. In a **fly or crossover** the elbow bend stays the same from start to end; if the arms bend more, it has turned into a press.
- [ ] **Hanging and supported exercises** (dips, pull-ups, chin-ups) have the feet clearly off the floor, touching nothing.
- [ ] Feet, hands and the bar are where the pose says, for example "feet under or slightly behind the knees" on the bench press.

**Second views only**
- [ ] The camera is the one named (top or side), the same in both panels. In a top view the head is at the left.
- [ ] It looks like the same athlete, equipment and style as the main image.
- [ ] From the top, the upper arms make an **arrow shape** toward the hips, not a T straight out to the sides.

---

## 5. When an image fails

1. **First fix, in the same chat:** reply with one short instruction that names the problem and keeps everything else. For example:
   - *"Keep the image exactly the same, but the hands must be wrapped around the dumbbell handle."*
   - *"Keep everything the same, but use the same side-view camera in both panels."*
   - *"Remove all numbers and degree signs from the image. Change nothing else."*
   - *"Keep everything the same, but the bench must be flat and horizontal, not inclined."*
   - *"The shoulder, hip and ankle dots must lie on one straight line, and the body must follow it. Fix the pose, not the line."*
2. **Still wrong after 2 fixes?** Start a **new chat** and paste the original prompt again.
3. **Failed in 2 new chats?** Try once more with the **Astra** model.
4. **Still failing?** Stop on that exercise. Mark it `needs-help` in the tracker with a short note on what keeps going wrong, and move on.

Never edit the prompt text itself. If a prompt seems wrong, note it in the tracker instead, so the data can be fixed at the source.

---

## 6. Tracking and handing back

Fill in `tracker.csv` as you go:

| Column | What to write |
|---|---|
| `status` | `todo`, `approved`, `needs-help` or `skipped` |
| `attempts` | How many images you generated for it, counting fixes |
| `model` | For example `Sol Thinking` or `Astra` |
| `notes` | What went wrong or what you fixed, in one line |

**When the trial (or the batch) is done, send back one zip containing:**
- every **approved** image as `<exercise-id>.png` (keep the PNGs; they get converted to WebP for the app afterwards)
- screenshots of any `needs-help` image
- the filled-in `tracker.csv`

**Report format for a failed exercise** (also fine to put straight in `notes`):
```
Exercise id:
Check that failed (layout / figure / equipment / muscles / alignment / text / safety):
What it looked like:
What I tried:
```

---

## 7. Quick rules

- One prompt per new chat, and never edit the prompts.
- Use a Thinking model for the whole batch.
- An image with **any** text or number in it is a fail.
- When unsure, compare against `3-approved-examples/`. If it's not as clear as those, fail it.
- Do the 6 trial images first and wait for feedback before doing the rest.
