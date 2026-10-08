# Sample prompts: 10 very different exercises

Purpose: test the image rules on exercises that stress them in different ways, **before** generating all 168. Each prompt tells ChatGPT to use the uploaded design guide (`exercise-image-design.md`) and gives it the exact data, so it has nothing to decide. This file is generated from `docs/data/whatnext-exercise-form-data.json` by `node scripts/build-image-prompts.mjs sample`; do not edit it by hand.

## How to run the test

1. Open a chat in the ChatGPT Project that has `exercise-image-design.md` and `push-up-approved.webp` uploaded.
2. Paste **one prompt at a time**, one exercise per message.
3. Save each result as `<exercise-id>.png` and judge it with the scoring list below.
4. Send me the failures (which exercise, which rule broke, a screenshot if possible).

## What each exercise tests

| # | Exercise id | What it stresses |
| --- | --- | --- |
| 1 | `push-up` | Body flat on the floor, no equipment; the elbow arc must sit on the elbow. |
| 2 | `barbell-back-squat` | Heavy equipment (bar on the back, not the neck), a rack, and two joint angles. |
| 3 | `kettlebell-swing` | Fast, ballistic movement with a flat back. |
| 4 | `pull-up` | Hanging body with the bar overhead. |
| 5 | `dumbbell-fly` | A different camera angle (three-quarter front). |
| 6 | `band-pull-apart` | Rear camera, so the back muscles face the viewer. |
| 7 | `plank` | A static hold: SET-UP and HOLD instead of START and END. |
| 8 | `cable-triceps-pushdown` | Cable machine and small arm muscles. |
| 9 | `dumbbell-bulgarian-split-squat` | Two legs doing different jobs, with a bench for the rear foot. |
| 10 | `leg-press` | Machine drawn in a reclined pose. |

## Scoring list (score each image pass / fail)

- [ ] Layout: two panels with a thin divider, LEFT = start, RIGHT = end (or set-up / hold); same figure, size and camera; faces left in side views
- [ ] Style: anatomical line-art, light-gray contour on near-black, body interior not filled gray; no 3D shading, gradient or glow
- [ ] Figure: exactly 2 arms, 2 legs, normal hands and feet; no clothes, hair or face
- [ ] Natural pose: a real, slightly imperfect rep, not rigid geometry, and still safe
- [ ] Muscles: the right muscles highlighted; primary = outlined lime with dense fibre lines; secondary = thinner dashed lime; nothing else highlighted
- [ ] Equipment: right type, nothing extra, gripped correctly, mid-gray lines, not lime
- [ ] Angles: labels written with a tilde (`~90°`), arcs centred on the named joint, drawn angles within about 10 degrees of the number
- [ ] Key range wedge: a faint wedge on the key joint only (if the prompt asks for one), with no range text
- [ ] Text: no words anywhere except the angle numbers

## Report-back template

```
Exercise id:
Rule that failed (layout / style / figure / natural pose / muscles / equipment / angles / wedge / text):
What it looked like:
What I expected:
```


### 1. push-up

*Tests: Body flat on the floor, no equipment; the elbow arc must sit on the elbow.*  ·  Save as `push-up.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: push-up (Push-Up)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT)
- Equipment: none, just the floor
- Primary muscles (outlined lime, faint tint, dense fibre lines): pectoralis major
- Secondary muscles (thinner dashed lime outlines): anterior deltoid, triceps brachii, rectus abdominis. Highlight no other muscle.
- LEFT panel, START: top of the push-up, arms straight, wrists under the shoulders, body in one straight line head to heels, feet together on the toes
- RIGHT panel, END: bottom of the push-up, chest a fist's height above the floor, body still straight, forearms near vertical, elbows tucked, hands under the lower chest
- Angle labels, LEFT panel: elbow ~175°
- Angle labels, RIGHT panel: elbow ~90°
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.
- Key angle range: on the RIGHT panel, at the "elbow ~90°" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at 70° and 100° and the dashed target line at 90° inside it. Do not write the range as text.

Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 2. barbell-back-squat

*Tests: Heavy equipment (bar on the back, not the neck), a rack, and two joint angles.*  ·  Save as `barbell-back-squat.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: barbell-back-squat (Barbell Back Squat)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT)
- Equipment: barbell with round plates across the upper back (not the neck), inside a squat rack with safety bars set low
- Primary muscles (outlined lime, faint tint, dense fibre lines): quadriceps, gluteus maximus
- Secondary muscles (thinner dashed lime outlines): hamstrings, adductors, erector spinae, rectus abdominis. Highlight no other muscle.
- LEFT panel, START: standing tall with the bar on the upper back, feet shoulder-width, toes slightly out, chest up, both hands on the bar
- RIGHT panel, END: deep squat, thighs at or just below parallel, torso leaning forward with a straight back, chest up, knees over toes, heels flat, safety bars just below the bar
- Angle labels, LEFT panel: knee ~175°
- Angle labels, RIGHT panel: knee ~90°, torso lean ~40° from vertical
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.
- Key angle range: on the RIGHT panel, at the "knee ~90°" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at 70° and 100° and the dashed target line at 90° inside it. Do not write the range as text.

Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 3. kettlebell-swing

*Tests: Fast, ballistic movement with a flat back.*  ·  Save as `kettlebell-swing.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: kettlebell-swing (Kettlebell Swing)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT)
- Equipment: one kettlebell held with both hands by the handle
- Primary muscles (outlined lime, faint tint, dense fibre lines): gluteus maximus, hamstrings
- Secondary muscles (thinner dashed lime outlines): erector spinae, rectus abdominis, latissimus dorsi, anterior and rear deltoid. Highlight no other muscle.
- LEFT panel, START: hinge position, hips far back, knees slightly bent, flat back leaning forward, arms straight, kettlebell between the legs behind the knees
- RIGHT panel, END: standing fully tall, hips and knees extended, glutes squeezed, arms straight out at chest height, kettlebell level with the chest
- Angle labels, LEFT panel: torso lean ~45° from vertical, knee ~140°
- Angle labels, RIGHT panel: arms ~90° from the torso
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.
- Key angle range: on the LEFT panel, at the "torso lean ~45° from vertical" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at 35° and 65° and the dashed target line at 45° inside it. Do not write the range as text.

Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 4. pull-up

*Tests: Hanging body with the bar overhead.*  ·  Save as `pull-up.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: pull-up (Pull-Up)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT)
- Equipment: a pull-up bar fixed overhead
- Primary muscles (outlined lime, faint tint, dense fibre lines): latissimus dorsi
- Secondary muscles (thinner dashed lime outlines): biceps brachii, teres major, rectus abdominis. Highlight no other muscle.
- LEFT panel, START: dead hang from the bar, overhand grip a little wider than the shoulders, arms straight, shoulders engaged, legs slightly bent behind
- RIGHT panel, END: chin above the bar, elbows pulled down toward the ribs, no swinging
- Angle labels, LEFT panel: elbow ~175°
- Angle labels, RIGHT panel: elbow ~60°
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.
- Key angle range: on the RIGHT panel, at the "elbow ~60°" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at 40° and 80° and the dashed target line at 60° inside it. Do not write the range as text.

Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 5. dumbbell-fly

*Tests: A different camera angle (three-quarter front).*  ·  Save as `dumbbell-fly.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: dumbbell-fly (Dumbbell Fly)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: three-quarter front view
- Equipment: two dumbbells and a flat bench
- Primary muscles (outlined lime, faint tint, dense fibre lines): pectoralis major
- Secondary muscles (thinner dashed lime outlines): anterior deltoid. Highlight no other muscle.
- LEFT panel, START: lying on a flat bench, feet flat, dumbbells above the chest, palms facing each other, elbows softly bent
- RIGHT panel, END: arms opened wide in an arc, dumbbells level with the chest, same soft elbow bend, chest stretched
- Angle labels, LEFT panel: elbow ~160°
- Angle labels, RIGHT panel: elbow ~160°
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.
- Key angle range: on the RIGHT panel, at the "elbow ~160°" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at 145° and 170° and the dashed target line at 160° inside it. Do not write the range as text.

Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 6. band-pull-apart

*Tests: Rear camera, so the back muscles face the viewer.*  ·  Save as `band-pull-apart.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: band-pull-apart (Band Pull-Apart)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: three-quarter rear view
- Equipment: one flat resistance band held in both hands
- Primary muscles (outlined lime, faint tint, dense fibre lines): rear deltoid, rhomboids, middle trapezius
- Secondary muscles (thinner dashed lime outlines): infraspinatus, teres minor, triceps brachii. Highlight no other muscle.
- LEFT panel, START: standing tall, both arms straight out in front at shoulder height, hands shoulder-width on the band, band slightly taut
- RIGHT panel, END: arms pulled wide to the sides at shoulder height, band stretched, shoulder blades squeezed, arms straight, shoulders down
- Angle labels, LEFT panel: elbow ~175°
- Angle labels, RIGHT panel: arms ~90° from the torso
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.
- Key angle range: on the RIGHT panel, at the "arms ~90° from the torso" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at 80° and 100° and the dashed target line at 90° inside it. Do not write the range as text.

Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 7. plank

*Tests: A static hold: SET-UP and HOLD instead of START and END.*  ·  Save as `plank.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: plank (Plank)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT)
- Equipment: none, just a thin exercise mat
- Primary muscles (outlined lime, faint tint, dense fibre lines): rectus abdominis, transversus abdominis, external obliques
- Secondary muscles (thinner dashed lime outlines): anterior deltoid, gluteus maximus. Highlight no other muscle.
- LEFT panel, SET-UP: kneeling on a mat with forearms flat on the floor, elbows directly under the shoulders, hips low
- RIGHT panel, HOLD: forearm plank on the toes, body in one straight line head to heels, hips level, elbows under the shoulders, neck neutral
- Angle labels, LEFT panel: elbow ~90°
- Angle labels, RIGHT panel: elbow ~90°, hip ~180°
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.
- Key angle range: on the RIGHT panel, at the "hip ~180°" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at 170° and 180° and the dashed target line at 180° inside it. Do not write the range as text.

Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 8. cable-triceps-pushdown

*Tests: Cable machine and small arm muscles.*  ·  Save as `cable-triceps-pushdown.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: cable-triceps-pushdown (Cable Triceps Pushdown)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT)
- Equipment: cable machine with the pulley at the top and a short straight bar
- Primary muscles (outlined lime, faint tint, dense fibre lines): triceps brachii
- Secondary muscles (thinner dashed lime outlines): forearm flexors, rectus abdominis, anterior deltoid. Highlight no other muscle.
- LEFT panel, START: standing upright facing the machine, elbows tucked at the sides, hands on the bar at chest height, forearms pointing up and slightly forward
- RIGHT panel, END: arms pushed straight down, bar at the thighs, elbows still at the sides, torso upright
- Angle labels, LEFT panel: elbow ~90°
- Angle labels, RIGHT panel: elbow ~170°, torso lean ~10° from vertical
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.
- Key angle range: on the RIGHT panel, at the "elbow ~170°" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at 160° and 180° and the dashed target line at 170° inside it. Do not write the range as text.

Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 9. dumbbell-bulgarian-split-squat

*Tests: Two legs doing different jobs, with a bench for the rear foot.*  ·  Save as `dumbbell-bulgarian-split-squat.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: dumbbell-bulgarian-split-squat (Dumbbell Bulgarian Split Squat)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT)
- Equipment: two dumbbells, one in each hand, and a flat bench behind for the rear foot
- Primary muscles (outlined lime, faint tint, dense fibre lines): quadriceps, gluteus maximus
- Secondary muscles (thinner dashed lime outlines): adductor magnus, hamstrings. Highlight no other muscle.
- LEFT panel, START: standing on the front leg a long stride in front of the bench, rear foot laces-down on the bench, torso upright, dumbbells at the sides
- RIGHT panel, END: lowered until the front thigh is parallel and the rear knee is just above the floor, front shin nearly vertical, front heel flat, torso slightly forward with a straight back
- Angle labels, LEFT panel: front knee ~170°
- Angle labels, RIGHT panel: front knee ~90°
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.
- Key angle range: on the RIGHT panel, at the "front knee ~90°" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at 75° and 105° and the dashed target line at 90° inside it. Do not write the range as text.

Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 10. leg-press

*Tests: Machine drawn in a reclined pose.*  ·  Save as `leg-press.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: leg-press (Leg Press)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT)
- Equipment: a 45° leg press machine with a padded back rest, sliding foot platform and side handles
- Primary muscles (outlined lime, faint tint, dense fibre lines): quadriceps
- Secondary muscles (thinner dashed lime outlines): gluteus maximus, hamstrings, adductors. Highlight no other muscle.
- LEFT panel, START: seated with back and hips flat on the pad, feet shoulder-width on the middle of the platform, legs extended with knees slightly bent, hands on the side handles
- RIGHT panel, END: platform lowered, knees bent, thighs close to the chest, hips and lower back still flat on the pad, feet flat
- Angle labels, LEFT panel: knee ~165°
- Angle labels, RIGHT panel: knee ~90°
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet, no perfectly straight or symmetric lines). Each labelled angle may differ from its target by up to about 10 degrees, but the pose must stay safe and good form.
- Key angle range: on the RIGHT panel, at the "knee ~90°" angle only, draw a faint translucent white wedge (about 15% opacity) with its edges at 75° and 105° and the dashed target line at 90° inside it. Do not write the range as text.

Place every angle arc exactly on the joint named in its label (guide section 7), never on the wrist, hand or foot, and show the same joint in both panels. Write every angle with a tilde as given. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

