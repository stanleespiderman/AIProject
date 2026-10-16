# WhatNext? Exercise Illustration Design Guide

**For the AI image generator.** This file is the permanent style guide for every exercise illustration in the WhatNext? fitness app. When I ask for an exercise image (for example "Make the image for goblet-squat"), always follow every rule below. Do not change the style between images. If something in my request conflicts with this guide, ask me before deviating.

---

## 1. What every image must be

- One image per exercise, **landscape 3:2** (for example 1536×1024), PNG.
- **Two panels side by side**, separated by a thin vertical divider line in dark gray `#2A2A33`.
  - LEFT panel = **START** position (for static holds: **SET-UP**).
  - RIGHT panel = **END** position (for static holds: **HOLD**).
- The **same athlete figure, same size, same camera angle** in both panels. Only the pose changes.
- In side views the athlete **faces LEFT** (the front of the body toward the left of the image), in both panels and in every image.
- **Framing:** the figure fills about 85% of the panel width and is centred vertically with a small margin. Avoid large empty areas. Both panels use the same scale and the same floor-line height.
- Purpose: a person in the gym glances at it mid-workout on a phone and instantly understands the movement, the muscles it trains and the body alignment. Clarity beats decoration.
- If a reference image `push-up-approved.webp` is attached, match its look exactly: line weight, colours and level of anatomical detail. **Ignore its angle arcs and numbers**: they come from an older version of this guide. Draw the alignment lines from section 7 instead.

## 2. Style and figure: anatomical line-art

- **Look:** a technical anatomy-chart illustration, like a precise engraving. Thin, clean contour lines. **No** filled 3D shading, gradients, glow, cartoon look or photo-realism.
- **Background:** flat near-black `#09090C`.
- **The figure** is a gender-neutral anatomy mannequin: no clothes, no hair, no facial features.
  - Body outline in fine light-gray lines, **`#C9CCD2`**. The inside of the body is transparent or very dark, **not** filled with gray.
  - Add subtle thin contour lines for muscle separations across the whole body in dim gray **`#5B5F68`**, plus a little fine hatching for depth, so it feels like a real anatomy drawing but stays clearly line-art.
  - Realistic human proportions. Exactly **two arms and two legs**, correct joints, normal hands and feet.
  - Neutral spine at all times: never rounded or over-arched, unless the exercise explicitly calls for it.
  - **Natural pose, not rigid geometry.** Draw a real, slightly imperfect human rep: soft joints, relaxed hands and feet, no perfectly straight or perfectly symmetric lines, nothing that looks like a protractor drawing. The lines the prompt calls straight, vertical or level (section 7) must still read that way; everything else can be relaxed. It must still be a safe, good-form rep (section 8).
- **Line weight:** thin and consistent (about 1 to 1.5 px at 1536 px width). Equipment lines may be slightly heavier (see section 4).
- **Floor:** a faint line in dark gray `#3A3A44` where relevant.

## 3. Muscles (the main feature)

- **Primary working muscles:** a clearly outlined anatomical muscle shape in **lime `#D4FF3A`**, with a very faint lime tint inside (about 15%) and **dense, clearly visible muscle-fibre striation lines** that follow the real fibre direction.
- **Secondary (assisting) muscles:** the same lime but **thinner, dashed outlines** with only a few fibre lines, clearly weaker than the primary muscle.
- **Everything else:** dim gray anatomy lines only. Never highlight more muscles than the exercise needs.
- **Visibility:** the primary muscles must be clearly visible from the chosen camera and must be the strongest-coloured thing in the image. If a secondary muscle looks as strong as a primary one, make it weaker.
- **Only the listed muscles:** highlight exactly the muscles given for the exercise and no others (for example, do not highlight the biceps unless it is listed).
- Lime is **reserved for muscles**. Nothing else in the image (equipment, alignment lines, dots) may be lime.
- **Where each muscle sits** (draw it in the right place):
  - Pectoralis major: the fan-shaped muscle across the front of the chest, from the breastbone and collarbone to the upper arm. In a side view, draw the near-side pec as a full fan on the chest wall.
  - Deltoids: the cap of the shoulder (anterior = front, lateral = side, rear = back).
  - Triceps brachii: the BACK of the upper arm. Biceps brachii: the FRONT of the upper arm.
  - Latissimus dorsi: the wide muscle running from the lower spine up to the armpit along the side of the back.
  - Rhomboids and middle trapezius: between and across the shoulder blades. Erector spinae: along both sides of the lower spine.
  - Rectus abdominis: the front strip of the abdomen. Obliques: the sides of the abdomen.
  - Gluteus maximus: the buttocks. Quadriceps: front of the thigh. Hamstrings: back of the thigh. Calves: back of the lower leg.
- Use proper anatomical names when thinking about shapes (pectoralis major, latissimus dorsi, gluteus maximus, rectus femoris, vastus lateralis, biceps femoris, triceps brachii, deltoids, rhomboids, rectus abdominis, erector spinae and so on).

## 4. Equipment

- Draw only the equipment named for the exercise. Nothing extra, no decorative gym background.
- Same line-art style as the figure, in **mid-gray `#7B8089`** lines (slightly heavier, about 2 px, so it reads clearly), with at most a faint dark fill. Never lime.
- Equipment must look correct: a dumbbell is a dumbbell, a kettlebell is a kettlebell, a barbell has round plates, a resistance band is a flat band.
- **Grip and contact:** every hand that holds equipment wraps around it, in both panels. The equipment sits exactly where the pose says (a bar on the upper back below the neck, a kettlebell hanging from both hands, a band in front of the chest). Nothing floats near a hand, and nothing passes through the body.
- If a rack, bench, machine or mat is needed, draw it simply, in the same mid-gray lines.

## 5. Background and layout

- Background: flat near-black **`#09090C`**. No gradients, no glow, no cast shadows, no textures.
- Faint floor line and thin divider as described above. Nothing else decorative.
- Keep a small margin around the figure. Both panels the same scale.

## 6. Camera

- Default: **strict side view**, so joint angles and body lines are readable.
- Use a **three-quarter rear view** for exercises where the back muscles must face the viewer (for example band pull-apart), and a **three-quarter front view** where the chest must face the viewer (for example dumbbell fly).
- Use a plain **front view** (athlete facing the viewer, symmetrical) for movements in the side-to-side plane, where a side view would hide the movement: lateral raises, side plank, hip abduction, carries, clamshell, windmill and Pallof press.
- The camera stated for an exercise overrides this default. **Both panels use exactly the same camera**: same viewpoint, same distance, same figure size. Never show one panel from the side and the other from behind or at three-quarters.

## 7. Alignment lines (important)

Every panel shows the few body lines that matter for good form, drawn over the figure, so the viewer sees at a glance what should be straight, vertical or level. It works like the pose-tracking overlay in a fitness app, but only for the lines the prompt lists. **There are no angle numbers, arcs, wedges or degree signs in the image.** The card in the app shows the numbers as text.

- **Joint dots:** small solid white dots (about 10 px across at 1536 px width) on the centre of each joint the prompt names (shoulder, elbow, hip, knee, ankle and so on). A dot sits on the joint centre, inside the body, never on the skin edge. Never put a dot on a hand or foot unless the prompt names the wrist, hand, ankle or mid-foot.
- **Alignment lines:** thin **solid** white lines (about 2 px, about 85% opacity) joining the dots along the body segment. Draw only the lines the prompt lists, never a full skeleton.
- **Reference lines:** only when the prompt asks for one, a thin white **dashed** vertical or horizontal line, for example "the bar stays over the mid-foot" or "the chin is above the bar". Solid means the body; dashed means a reference.
- **The lines must tell the truth.** If the prompt says "one straight line from shoulder through hip to ankle", those three dots must really line up on the drawn body. If it says "vertical" or "level with the floor", the line must look vertical or level. If the body and the line disagree, fix the pose, not the line.
- When the prompt says "the same" line in both panels, draw it on the same joints in both, so START and END can be compared.
- Never draw two lines from the same dot in nearly the same direction (for example a torso line and an arm line both running down from the shoulder): they read as one confusing V. Lines that share a dot must point clearly different ways.
- At most **three alignment lines plus one dashed reference line** per panel. No arrows, arcs, wedges, glow or extra shapes.
- White is reserved for the alignment lines, dots and reference lines; lime is reserved for muscles.
- **No text anywhere in the image:** no numbers, titles, captions, exercise names, muscle names, letters, logos or watermarks.

## 8. Safety and form rules

These images teach form, so a wrong picture can hurt someone. Never draw:

- A rounded or over-arched back during lifts.
- Knees collapsing inward, heels lifting during squats, locked-out elbows being slammed, hips sagging or piking in plank-type positions, or any unsafe position.
- Equipment resting on the neck (a barbell sits on the upper back/shoulders).
- Extra or missing limbs, merged hands, or equipment passing through the body.

If the exercise description would force an unsafe position, say so instead of drawing it.

## 9. Quality checklist (check before showing me)

1. Layout: 3:2, two panels with a thin divider, LEFT = start, RIGHT = end; same athlete, size and exactly the same camera viewpoint in both panels; athlete faces left in side views; figure fills about 85% of panel width.
2. Style: anatomical line-art, light-gray contour on near-black, body interior not filled gray; no 3D shading, gradients or glow.
3. Figure: exactly 2 arms and 2 legs, normal hands and feet, neutral spine.
4. Equipment: right type, nothing extra, mid-gray lines, not lime; every holding hand wrapped around it, sitting where the pose says, nothing floating or passing through the body.
5. Muscles: the right ones highlighted and in the right place; primary = outlined lime with a faint tint and dense fibre lines; secondary = thinner dashed lime; nothing else highlighted.
6. START and END clearly differ and match the description.
7. Alignment: only the listed lines; every dot on a joint centre; solid white for body lines, dashed only for reference lines; lines called straight, vertical or level look that way on the drawn body; the same lines in both panels where asked. The pose looks natural, not rigid.
8. No text anywhere: no numbers, degree signs, letters or labels.

If any check fails, fix it before showing me. If I report a problem, change **only** that problem and keep everything else identical.

---

## 10. How I will ask

Each message gives you the full data for one exercise: camera, equipment, primary and secondary muscles, the LEFT and RIGHT panel poses, and the alignment lines for each panel. Use exactly that data and this guide. If any item is missing or unclear, ask me instead of guessing.

The file name I will save it as is `<exercise-id>.png`.
