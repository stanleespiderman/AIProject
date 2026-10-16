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
| 1 | `push-up` | Body flat on the floor, no equipment; the shoulder-hip-ankle line must really be straight. |
| 2 | `barbell-back-squat` | Heavy equipment (bar on the back, not the neck), a rack, and a dashed bar-path reference line. |
| 3 | `kettlebell-swing` | Fast, ballistic movement with a flat back. |
| 4 | `pull-up` | Hanging body with the bar overhead. |
| 5 | `dumbbell-fly` | A different camera angle (three-quarter front). |
| 6 | `band-pull-apart` | Rear camera, so the back muscles face the viewer. |
| 7 | `plank` | A static hold: SET-UP and HOLD instead of START and END. |
| 8 | `cable-triceps-pushdown` | Cable machine and small arm muscles. |
| 9 | `dumbbell-bulgarian-split-squat` | Two legs doing different jobs, with a bench for the rear foot. |
| 10 | `leg-press` | Machine drawn in a reclined pose. |

## Scoring list (score each image pass / fail)

- [ ] Layout: two panels with a thin divider, LEFT = start, RIGHT = end (or set-up / hold); same figure and size, exactly the same camera viewpoint in both panels; faces left in side views
- [ ] Style: anatomical line-art, light-gray contour on near-black, body interior not filled gray; no 3D shading, gradient or glow
- [ ] Figure: exactly 2 arms, 2 legs, normal hands and feet; no clothes, hair or face
- [ ] Natural pose: a real, slightly imperfect rep, not rigid geometry, and still safe
- [ ] Muscles: the right muscles highlighted; primary = outlined lime with dense fibre lines; secondary = thinner dashed lime; nothing else highlighted
- [ ] Equipment: right type, nothing extra, mid-gray lines, not lime; hands wrapped around it, nothing floating or passing through the body
- [ ] Alignment: only the listed lines; dots on joint centres; solid for body lines, dashed only for reference lines; lines called straight, vertical or level really look that way on the body
- [ ] Text: no text at all (no numbers, degree signs or arcs left over from the reference image)

## Report-back template

```
Exercise id:
Rule that failed (layout / style / figure / natural pose / muscles / equipment / alignment / text):
What it looked like:
What I expected:
```


### 1. push-up

*Tests: Body flat on the floor, no equipment; the shoulder-hip-ankle line must really be straight.*  ·  Save as `push-up.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: push-up (Push-Up)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT). Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.
- Equipment: none, just the floor
- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.
- Primary muscles (outlined lime, faint tint, dense fibre lines): pectoralis major
- Secondary muscles (thinner dashed lime outlines): anterior deltoid, triceps brachii, rectus abdominis. Highlight no other muscle.
- LEFT panel, START: top of the push-up, arms straight, wrists under the shoulders, body in one straight line head to heels, feet together on the toes
- RIGHT panel, END: bottom of the push-up, chest a fist's height above the floor, body still straight, forearms near vertical, elbows tucked, hands under the lower chest
- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):
    - one straight line from shoulder through hip to ankle (dots on shoulder, hip and ankle)
    - arm line from shoulder to wrist, vertical, wrist under the shoulder (dot on the wrist)
- Alignment lines, RIGHT panel (same style):
    - the same straight line from shoulder through hip to ankle (dots on shoulder, hip and ankle)
    - forearm line from elbow to wrist, near vertical, elbow tucked (dots on elbow and wrist)
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.

Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs, even though the reference image has them. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.
```

### 2. barbell-back-squat

*Tests: Heavy equipment (bar on the back, not the neck), a rack, and a dashed bar-path reference line.*  ·  Save as `barbell-back-squat.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: barbell-back-squat (Barbell Back Squat)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT). Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.
- Equipment: barbell with round plates, resting across the upper back at shoulder-blade height, below the base of the neck (in the side view the plate is a circle centred just behind the shoulders, never behind the head or neck, with the bar shaft running through its centre); inside a squat rack whose uprights and low safety bars stand beside the athlete and never pass through the body
- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.
- Primary muscles (outlined lime, faint tint, dense fibre lines): quadriceps, gluteus maximus
- Secondary muscles (thinner dashed lime outlines): hamstrings, adductors, erector spinae, rectus abdominis. Highlight no other muscle.
- LEFT panel, START: standing tall with the bar on the upper back, feet shoulder-width, toes slightly out, chest up, both hands gripping the bar just outside the shoulders, elbows pointing down and back
- RIGHT panel, END: deep squat, thighs at or just below parallel, torso leaning forward with a straight back, chest up, knees over toes, heels flat, bar still on the upper back with both hands still gripping it, safety bars just below the bar
- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):
    - one vertical line from the bar on the upper back down through the hip to the mid-foot (dots on bar, hip and mid-foot)
    - thigh and shin lines, nearly straight (dot on the knee)
- Alignment lines, RIGHT panel (same style):
    - torso line from hip to shoulder, straight back, leaning forward (dots on hip and shoulder)
    - thigh line from hip to knee, about level with the floor (dot on the knee)
    - dashed vertical reference line from the bar down to the mid-foot: the bar stays over the mid-foot
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.

Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs, even though the reference image has them. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.
```

### 3. kettlebell-swing

*Tests: Fast, ballistic movement with a flat back.*  ·  Save as `kettlebell-swing.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: kettlebell-swing (Kettlebell Swing)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT). Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.
- Equipment: one kettlebell, its handle held by both hands at all times (fingers wrapped around the handle; the kettlebell hangs from the hands and never floats away from them)
- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.
- Primary muscles (outlined lime, faint tint, dense fibre lines): gluteus maximus, hamstrings
- Secondary muscles (thinner dashed lime outlines): erector spinae, rectus abdominis, latissimus dorsi, anterior and rear deltoid. Highlight no other muscle.
- LEFT panel, START: hinge position, hips far back, knees slightly bent, flat back leaning forward, head in line with the spine (neck neutral, not dropped), arms straight, both hands on the kettlebell handle, the kettlebell hanging from the hands between the thighs, just behind the knees
- RIGHT panel, END: standing fully tall, hips and knees extended, glutes squeezed, arms straight out at chest height, both hands still on the handle, kettlebell level with the chest
- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):
    - torso line from hip to the back of the head, straight (flat back), leaning forward (dots on hip and shoulder)
    - thigh and shin lines, knee softly bent (dot on the knee)
- Alignment lines, RIGHT panel (same style):
    - one straight vertical line from ankle through knee and hip to shoulder: standing fully tall (dots on ankle, knee, hip and shoulder)
    - arm line from shoulder to the kettlebell, level with the floor (dot on the shoulder)
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.

Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs, even though the reference image has them. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.
```

### 4. pull-up

*Tests: Hanging body with the bar overhead.*  ·  Save as `pull-up.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: pull-up (Pull-Up)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT). Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.
- Equipment: a straight pull-up bar overhead on a simple free-standing frame; in the side view the bar points toward the viewer, so it shows as a short round bar with the hands wrapped over it; no wall bracket and nothing in front of the athlete's face or body
- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.
- Primary muscles (outlined lime, faint tint, dense fibre lines): latissimus dorsi
- Secondary muscles (thinner dashed lime outlines): biceps brachii, teres major, rectus abdominis. Highlight no other muscle.
- LEFT panel, START: dead hang from the bar, overhand grip a little wider than the shoulders, arms straight, shoulders engaged, body hanging directly below the bar, legs slightly bent behind, feet clearly off the floor
- RIGHT panel, END: chin clearly above the top of the bar, elbows pulled down toward the ribs, body still directly below the bar, no swinging, feet clearly off the floor
- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):
    - one straight line from hand through elbow to shoulder: arm fully straight (dots on hand, elbow and shoulder)
    - body line from shoulder to hip, hanging directly under the bar
- Alignment lines, RIGHT panel (same style):
    - upper arm and forearm lines, elbow pulled down beside the ribs (dot on the elbow)
    - dashed horizontal reference line along the top of the bar: the chin is above it
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.

Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs, even though the reference image has them. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.
```

### 5. dumbbell-fly

*Tests: A different camera angle (three-quarter front).*  ·  Save as `dumbbell-fly.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: dumbbell-fly (Dumbbell Fly)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: front view from the foot end of the bench (looking along the bench at the athlete, symmetrical). Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.
- Equipment: two dumbbells and a flat bench: the bench pad is horizontal, level with the floor, NOT inclined (head and hips at the same height)
- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.
- Primary muscles (outlined lime, faint tint, dense fibre lines): pectoralis major
- Secondary muscles (thinner dashed lime outlines): anterior deltoid. Highlight no other muscle.
- LEFT panel, START: lying flat on a horizontal bench, head and hips at the same height, feet flat on the floor, dumbbells above the chest, palms facing each other, elbows softly bent
- RIGHT panel, END: arms opened wide in an arc, dumbbells level with the chest, same soft elbow bend, chest stretched
- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):
    - a line along each arm from shoulder to dumbbell, with a dot on each elbow showing the soft bend
- Alignment lines, RIGHT panel (same style):
    - the same arm lines opened wide, same soft elbow bend (dots on the elbows)
    - dashed horizontal reference line across the chest: the dumbbells stop level with the chest, not below it
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.

Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs, even though the reference image has them. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.
```

### 6. band-pull-apart

*Tests: Rear camera, so the back muscles face the viewer.*  ·  Save as `band-pull-apart.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: band-pull-apart (Band Pull-Apart)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: three-quarter rear view (athlete turned about 30 degrees away from the viewer, the same turn in both panels). Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.
- Equipment: one flat resistance band held in both hands, always in front of the body at shoulder height (never behind the neck or head); from the rear camera the middle of the band is hidden behind the torso and only its ends show beside the hands
- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.
- Primary muscles (outlined lime, faint tint, dense fibre lines): rear deltoid, rhomboids, middle trapezius (between the shoulder blades only, not the upper trapezius on the neck)
- Secondary muscles (thinner dashed lime outlines): infraspinatus, teres minor, triceps brachii. Highlight no other muscle.
- LEFT panel, START: standing tall, both arms straight out in front at shoulder height, hands shoulder-width on the band, band slightly taut in front of the chest
- RIGHT panel, END: arms pulled wide to the sides at shoulder height, band stretched across the front of the chest, the band ends clearly visible coming out of both fists, shoulder blades squeezed, arms straight, shoulders down
- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):
    - a straight line along each arm from shoulder to hand, at shoulder height (dots on shoulders and hands)
- Alignment lines, RIGHT panel (same style):
    - one straight horizontal line from hand to hand through both shoulders: arms out wide at shoulder height (dots on hands and shoulders)
    - vertical spine line from the base of the neck to the hips: torso stays tall
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.

Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs, even though the reference image has them. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.
```

### 7. plank

*Tests: A static hold: SET-UP and HOLD instead of START and END.*  ·  Save as `plank.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: plank (Plank)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT). Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.
- Equipment: none, just a thin exercise mat
- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.
- Primary muscles (outlined lime, faint tint, dense fibre lines): rectus abdominis, transversus abdominis, external obliques
- Secondary muscles (thinner dashed lime outlines): anterior deltoid, gluteus maximus. Highlight no other muscle.
- LEFT panel, SET-UP: kneeling on a mat with forearms flat on the floor, elbows directly under the shoulders, hips low
- RIGHT panel, HOLD: forearm plank on the toes, body in one straight line head to heels, hips level, elbows under the shoulders, neck neutral
- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):
    - upper arm line from shoulder to elbow, vertical: elbow under the shoulder (dots on shoulder and elbow)
    - torso line from shoulder to hip, and thigh line from hip to knee (dots on hip and knee)
- Alignment lines, RIGHT panel (same style):
    - one straight line from shoulder through hip to ankle: hips level, no sag or pike (dots on shoulder, hip and ankle)
    - upper arm line from shoulder to elbow, vertical: elbow under the shoulder (dot on the elbow)
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.

Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs, even though the reference image has them. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.
```

### 8. cable-triceps-pushdown

*Tests: Cable machine and small arm muscles.*  ·  Save as `cable-triceps-pushdown.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: cable-triceps-pushdown (Cable Triceps Pushdown)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT). Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.
- Equipment: cable machine with the pulley at the top and a short straight bar
- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.
- Primary muscles (outlined lime, faint tint, dense fibre lines): triceps brachii
- Secondary muscles (thinner dashed lime outlines): forearm flexors, rectus abdominis, anterior deltoid. Highlight no other muscle.
- LEFT panel, START: standing upright facing the machine, elbows tucked at the sides, hands on the bar at chest height, forearms pointing up and slightly forward
- RIGHT panel, END: arms pushed straight down, bar at the thighs, elbows still at the sides, torso upright
- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):
    - upper arm line from shoulder to elbow, vertical, elbow pinned at the side (dots on shoulder and elbow)
    - forearm line from elbow to hands (dot on the hands)
- Alignment lines, RIGHT panel (same style):
    - the same vertical upper arm line, elbow still at the side (dots on shoulder and elbow)
    - forearm line continuing straight down from the elbow to the bar: arm fully straight
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.

Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs, even though the reference image has them. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.
```

### 9. dumbbell-bulgarian-split-squat

*Tests: Two legs doing different jobs, with a bench for the rear foot.*  ·  Save as `dumbbell-bulgarian-split-squat.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: dumbbell-bulgarian-split-squat (Dumbbell Bulgarian Split Squat)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT). Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.
- Equipment: two dumbbells, one in each hand, and a flat bench behind for the rear foot
- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.
- Primary muscles (outlined lime, faint tint, dense fibre lines): quadriceps, gluteus maximus
- Secondary muscles (thinner dashed lime outlines): adductor magnus, hamstrings. Highlight no other muscle.
- LEFT panel, START: standing on the front leg a long stride in front of the bench, rear foot laces-down on the bench, torso upright, dumbbells at the sides
- RIGHT panel, END: lowered until the front thigh is parallel and the rear knee is just above the floor, front shin nearly vertical, front heel flat, torso slightly forward with a straight back
- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):
    - torso line from hip to shoulder, upright (dots on hip and shoulder)
    - front-leg thigh and shin lines, nearly straight (dot on the front knee)
- Alignment lines, RIGHT panel (same style):
    - front shin line from ankle to knee, nearly vertical (dots on ankle and front knee)
    - front thigh line from knee to hip, about level with the floor (dot on the hip)
    - torso line from hip to shoulder, slightly forward, back straight (dot on the shoulder)
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.

Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs, even though the reference image has them. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.
```

### 10. leg-press

*Tests: Machine drawn in a reclined pose.*  ·  Save as `leg-press.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, style, muscles, equipment, camera, alignment lines, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: leg-press (Leg Press)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view (athlete faces LEFT). Use exactly this camera in BOTH panels: same viewpoint, same distance, same figure size. Never switch to a different view in one panel.
- Equipment: a 45° leg press machine with a padded back rest, sliding foot platform and side handles
- Grip and contact: every hand that holds equipment is wrapped around it, in both panels. The equipment sits exactly where the poses below say; nothing floats, and no equipment passes through the body.
- Primary muscles (outlined lime, faint tint, dense fibre lines): quadriceps
- Secondary muscles (thinner dashed lime outlines): gluteus maximus, hamstrings, adductors. Highlight no other muscle.
- LEFT panel, START: seated with back and hips flat on the pad, feet shoulder-width on the middle of the platform, legs extended with knees slightly bent, hands on the side handles
- RIGHT panel, END: platform lowered, knees bent, thighs close to the chest, hips and lower back still flat on the pad, feet flat
- Alignment lines, LEFT panel (white dots on the joint centres, solid white lines between them; dashed only for reference lines):
    - thigh and shin lines, knee slightly bent, never locked (dots on hip, knee and ankle)
    - back line along the pad from hip to shoulder: lower back flat on the pad
- Alignment lines, RIGHT panel (same style):
    - thigh and shin lines, knee bent to about a right angle (dots on hip, knee and ankle)
    - the same back line along the pad from hip to shoulder: hips and lower back still flat on the pad
- Natural pose: draw a natural, slightly imperfect human rep, not rigid geometry (soft joints, relaxed hands and feet). The lines above that are called straight, vertical or level must really look that way on the drawn body; everything else can be relaxed. The pose must stay safe and good form.

Draw only the alignment lines listed above (guide section 7), never a full skeleton, and put every dot on the centre of the named joint. Do not draw angle arcs, wedges, numbers or degree signs, even though the reference image has them. Highlight only the muscles listed above, in the right place on the body. If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. There must be no text of any kind in the image.
```

