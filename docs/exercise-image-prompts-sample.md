# Sample prompts: 10 very different exercises

Purpose: test the image rules on exercises that stress them in different ways, **before** generating all 168. Each prompt tells ChatGPT to use the uploaded design guide (`exercise-image-design.md`) and gives it the exact data, so it has nothing to decide.

## How to run the test

1. Open a chat in the ChatGPT Project that has `exercise-image-design.md` uploaded.
2. Paste **one prompt at a time**. One exercise per message keeps the style rules fresh.
3. Save each result as `<exercise-id>.png` and judge it with the scoring list below.
4. Send me the failures (which exercise, which rule broke, a screenshot if possible). I'll fix the guide or the data, then we generate the rest.

## What each exercise tests

| # | Exercise id | What it stresses |
| --- | --- | --- |
| 1 | `push-up` | Body horizontal on the floor, no equipment, elbow angle at both ends. |
| 2 | `barbell-back-squat` | Heavy equipment placement (bar on the back, not the neck), rack and safety bars, two joint angles. |
| 3 | `kettlebell-swing` | Dynamic/ballistic movement, one kettlebell, hip hinge with a flat back. |
| 4 | `pull-up` | Hanging body, equipment overhead, back muscles visible from the side. |
| 5 | `dumbbell-fly` | Different camera (three-quarter front), lying on a bench, arms moving in an arc. |
| 6 | `band-pull-apart` | Rear camera so back muscles face the viewer, thin resistance band, arms at shoulder height. |
| 7 | `plank` | STATIC hold: start and end are not two movement positions, so this tests the set-up / hold approach. |
| 8 | `cable-triceps-pushdown` | Cable machine and bar, small isolated arm movement, arm muscle detail. |
| 9 | `dumbbell-bulgarian-split-squat` | Asymmetric single-leg pose: two legs doing different jobs, bench for the rear foot. |
| 10 | `leg-press` | Machine drawn in a reclined seated pose, feet on a sled platform. |

## Scoring list (score each image pass / fail)

- [ ] Layout: two panels, LEFT = start, RIGHT = end (or set-up / hold), same figure, size and camera
- [ ] Figure: pale gray mannequin, no clothes, hair or face; exactly 2 arms, 2 legs, normal hands and feet
- [ ] Muscles: the right muscles highlighted; primary in lime with fibre lines; secondary paler; rest plain gray
- [ ] Equipment: right type, nothing extra, gripped correctly, mid-gray with a white outline, not lime
- [ ] Form: neutral spine, safe positions, nothing resting on the neck, no body parts through equipment
- [ ] Angles: labels read exactly as given, and each drawn angle visually matches its number
- [ ] Text: no words anywhere except the angle numbers with degree signs
- [ ] Background: flat near-black, no gradient, shadow or 3D look

## Report-back template

```
Exercise id:
Rule that failed (layout / figure / muscles / equipment / form / angles / text / background):
What it looked like:
What I expected:
```

## The 10 prompts

### 1. push-up

*Tests: Body horizontal on the floor, no equipment, elbow angle at both ends.*  ·  Save as `push-up.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, mannequin, colours, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: push-up (Push-Up)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view
- Equipment: none, just the floor
- Primary muscles (lime, with fibre lines): pectoralis major (chest), fibres fanning from the breastbone toward the upper arm
- Secondary muscles (pale lime): anterior deltoids, triceps brachii, rectus abdominis (abs)
- LEFT panel, START: top of the push-up, arms fully straight, hands directly under the shoulders, body in one straight line from head to heels, feet together on their toes
- RIGHT panel, END: bottom of the push-up, chest a fist's height above the floor, elbows bent and angled about 45° back from the body, body still in one straight line, hips not sagging or piking
- Angle labels, LEFT panel: elbow angle 180°
- Angle labels, RIGHT panel: elbow angle 90°

If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 2. barbell-back-squat

*Tests: Heavy equipment placement (bar on the back, not the neck), rack and safety bars, two joint angles.*  ·  Save as `barbell-back-squat.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, mannequin, colours, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: barbell-back-squat (Barbell Back Squat)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view
- Equipment: one barbell with round weight plates across the upper back (not on the neck), inside a simple squat rack with safety bars set low
- Primary muscles (lime, with fibre lines): quadriceps (rectus femoris and vastus lateralis) and gluteus maximus
- Secondary muscles (pale lime): hamstrings, adductors, erector spinae (lower back), rectus abdominis (abs)
- LEFT panel, START: standing tall with the barbell on the upper back, feet shoulder-width apart, toes slightly out, chest up, both hands gripping the bar
- RIGHT panel, END: deep squat with thighs at or just below parallel, torso leaning forward with a straight back, chest up, knees over the toes, heels flat on the floor, barbell still on the upper back, safety bars just below the bar
- Angle labels, LEFT panel: knee angle 180°
- Angle labels, RIGHT panel: knee angle 90°, torso lean 40° from vertical

If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 3. kettlebell-swing

*Tests: Dynamic/ballistic movement, one kettlebell, hip hinge with a flat back.*  ·  Save as `kettlebell-swing.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, mannequin, colours, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: kettlebell-swing (Kettlebell Swing)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view
- Equipment: one kettlebell held with both hands by the handle
- Primary muscles (lime, with fibre lines): gluteus maximus and hamstrings (biceps femoris, semitendinosus)
- Secondary muscles (pale lime): erector spinae (lower back), rectus abdominis (abs), latissimus dorsi, front and rear deltoids
- LEFT panel, START: the hinge position: hips pushed far back, knees slightly bent, torso leaning forward with a flat straight back, arms straight, kettlebell hanging between the legs just behind the knees
- RIGHT panel, END: standing fully tall, hips and knees fully extended, glutes squeezed, arms straight out in front at chest height, kettlebell floating level with the chest
- Angle labels, LEFT panel: torso 45° from vertical, knee angle 140°
- Angle labels, RIGHT panel: arms 90° from the torso

If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 4. pull-up

*Tests: Hanging body, equipment overhead, back muscles visible from the side.*  ·  Save as `pull-up.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, mannequin, colours, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: pull-up (Pull-Up)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view
- Equipment: a pull-up bar fixed overhead
- Primary muscles (lime, with fibre lines): latissimus dorsi (fibres running up toward the armpit)
- Secondary muscles (pale lime): biceps brachii, teres major, rectus abdominis (abs)
- LEFT panel, START: dead hang from the bar with an overhand grip a little wider than the shoulders, arms straight, shoulders engaged, legs slightly bent behind the body
- RIGHT panel, END: chin above the bar, elbows pulled down toward the ribs, no swinging
- Angle labels, LEFT panel: elbow angle 180°
- Angle labels, RIGHT panel: elbow angle 50°

If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 5. dumbbell-fly

*Tests: Different camera (three-quarter front), lying on a bench, arms moving in an arc.*  ·  Save as `dumbbell-fly.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, mannequin, colours, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: dumbbell-fly (Dumbbell Fly)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: three-quarter FRONT view (athlete seen from the front and slightly to the side), so the chest faces the viewer
- Equipment: two dumbbells and a flat bench
- Primary muscles (lime, with fibre lines): pectoralis major (fibres fanning from the breastbone to the upper arm)
- Secondary muscles (pale lime): anterior deltoids
- LEFT panel, START: lying on a flat bench, feet flat on the floor, a dumbbell in each hand held above the chest with palms facing each other, elbows softly bent
- RIGHT panel, END: arms opened wide in an arc until the dumbbells are level with the chest, elbows kept softly bent in the same position, chest stretched
- Angle labels, LEFT panel: elbow angle 165°
- Angle labels, RIGHT panel: elbow angle 150°

If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 6. band-pull-apart

*Tests: Rear camera so back muscles face the viewer, thin resistance band, arms at shoulder height.*  ·  Save as `band-pull-apart.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, mannequin, colours, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: band-pull-apart (Band Pull-Apart)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: three-quarter REAR view (athlete seen from behind and slightly to the side), so the upper-back muscles face the viewer
- Equipment: one flat resistance band held in both hands
- Primary muscles (lime, with fibre lines): rear deltoids and rhomboids / middle trapezius (the muscles between and across the shoulder blades)
- Secondary muscles (pale lime): infraspinatus, teres minor, triceps brachii
- LEFT panel, START: standing tall, feet hip-width apart, both arms straight out in front at shoulder height, hands about shoulder-width apart gripping the band, band slightly taut
- RIGHT panel, END: arms pulled wide out to the sides at shoulder height, the band stretched across the body, shoulder blades squeezed together, arms still straight, shoulders down (not shrugged)
- Angle labels, LEFT panel: elbow angle 180°
- Angle labels, RIGHT panel: arms 90° from the torso

If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 7. plank

*Tests: STATIC hold: start and end are not two movement positions, so this tests the set-up / hold approach.*  ·  Save as `plank.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, mannequin, colours, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: plank (Plank)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view
- Equipment: none, just a thin exercise mat
- Primary muscles (lime, with fibre lines): rectus abdominis and transversus abdominis (deep abs), external obliques
- Secondary muscles (pale lime): anterior deltoids, gluteus maximus
- LEFT panel, SET-UP: kneeling on a mat with the forearms flat on the floor, elbows directly under the shoulders, hips low, about to lift into the plank
- RIGHT panel, HOLD: forearm plank held on the toes, body in one straight line from head to heels, hips level (not sagging or piking), elbows under the shoulders, neck neutral
- Angle labels, LEFT panel: elbow angle 90°, knee angle 90°
- Angle labels, RIGHT panel: elbow angle 90°, hip angle 180°

If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 8. cable-triceps-pushdown

*Tests: Cable machine and bar, small isolated arm movement, arm muscle detail.*  ·  Save as `cable-triceps-pushdown.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, mannequin, colours, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: cable-triceps-pushdown (Cable Triceps Pushdown)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view
- Equipment: a cable machine with the pulley at the top and a short straight bar attached
- Primary muscles (lime, with fibre lines): triceps brachii (long head, lateral head and medial head, with fibres visible)
- Secondary muscles (pale lime): forearm flexors (gripping), rectus abdominis (abs), anterior deltoids
- LEFT panel, START: standing upright facing the machine, elbows tucked tight against the sides, hands gripping the bar at chest height, forearms pointing up and slightly forward
- RIGHT panel, END: arms pushed straight down, bar at the thighs, elbows still tucked against the sides and not moved forward, shoulders down, torso upright
- Angle labels, LEFT panel: elbow angle 90°
- Angle labels, RIGHT panel: elbow angle 170°, torso lean 10° from vertical

If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 9. dumbbell-bulgarian-split-squat

*Tests: Asymmetric single-leg pose: two legs doing different jobs, bench for the rear foot.*  ·  Save as `dumbbell-bulgarian-split-squat.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, mannequin, colours, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: dumbbell-bulgarian-split-squat (Dumbbell Bulgarian Split Squat)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view
- Equipment: two dumbbells, one in each hand, and a flat bench behind the athlete for the rear foot
- Primary muscles (lime, with fibre lines): quadriceps (rectus femoris and vastus lateralis) and gluteus maximus of the FRONT leg
- Secondary muscles (pale lime): adductor magnus, hamstrings
- LEFT panel, START: standing on the front leg a long stride in front of the bench, the rear foot resting laces-down on the bench, torso upright, a dumbbell hanging in each hand at the sides
- RIGHT panel, END: lowered straight down until the front thigh is parallel to the floor and the rear knee is just above the floor, front shin nearly vertical, front heel flat, torso leaning slightly forward with a straight back
- Angle labels, LEFT panel: front knee angle 175°
- Angle labels, RIGHT panel: front knee angle 90°, torso lean 15° from vertical

If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

### 10. leg-press

*Tests: Machine drawn in a reclined seated pose, feet on a sled platform.*  ·  Save as `leg-press.png`

```
Use the attached design guide "exercise-image-design.md" (the WhatNext? Exercise Illustration Design Guide). Follow EVERY rule in it exactly: layout, mannequin, colours, muscles, equipment, camera, angle labels, safety rules and the section 9 checklist. Do not change the style and do not add anything that is not listed below. The camera stated below overrides the default camera in the guide.

Create the image for exercise id: leg-press (Leg Press)

EXERCISE DATA (use exactly this; do not substitute or improvise):
- Camera: strict side view
- Equipment: a 45° leg press machine with a padded back rest, a sliding foot platform (sled) and side handles
- Primary muscles (lime, with fibre lines): quadriceps (rectus femoris and vastus lateralis)
- Secondary muscles (pale lime): gluteus maximus, hamstrings, adductors
- LEFT panel, START: seated with the back and hips flat on the pad, feet shoulder-width apart on the middle of the platform, legs extended with the knees slightly bent (not locked), hands holding the side handles
- RIGHT panel, END: platform lowered by bending the knees, thighs close to the chest, hips and lower back still flat on the pad (hips not lifting off), feet still flat on the platform
- Angle labels, LEFT panel: knee angle 170°
- Angle labels, RIGHT panel: knee angle 90°, back rest 45° from the floor

If anything above is unclear or conflicts with the guide, ask me before drawing. Before showing the image, run the section 9 checklist and fix any failure. The only text allowed in the image is the angle labels listed above.
```

## After the test

Tell me what failed. I'll adjust the design guide and the data, then write the remaining exercises in batches (about 168 in total).
