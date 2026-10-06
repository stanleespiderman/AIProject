# Exercise images: prompt template and pilot list

Goal: one image per exercise, showing the **start** and **end** position side by side. Saved as `public/exercises/<exercise-id>.png`.

## How to use

1. Open a **new ChatGPT chat** (use a fresh chat per exercise, or ask for "the same style" if you keep one going).
2. Paste the **Master template**, replacing the `{…}` parts, or paste one of the ready-made prompts below.
3. Check the result against the **checklist**. If something is wrong, tell ChatGPT exactly what ("the dumbbell is a barbell", "only one arm visible") and regenerate.
4. Save the final image as `<exercise-id>.png` (the id is in the table below; use it exactly).
5. Upload the files to `public/exercises/` in the GitHub repo (Add file → Upload files) and tell me. I'll resize them and show them on the cards.

## Master template

```
Flat vector fitness illustration of the exercise "{EXERCISE NAME}", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
to highlight the equipment and a small glow on the main working muscle. No gradients, no shadows,
no 3D, no photo-realism.

Camera: {CAMERA, usually "strict side view"}. The SAME athlete, same size and same camera in both panels.

Equipment: {EQUIPMENT, exactly this and nothing else}.

START position: {START DESCRIPTION}.
END position: {END DESCRIPTION}.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment,
neutral spine (no rounded or over-arched back), realistic proportions, equipment drawn correctly.
Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

## Checklist (reject the image if any of these fail)

- [ ] Exactly 2 arms, 2 legs, hands and feet look normal
- [ ] Equipment is the right type (dumbbell is not a kettlebell, etc.) and nothing extra
- [ ] Back is straight, not rounded or over-arched, in both panels
- [ ] Start and end are clearly different and match the descriptions
- [ ] Same person, same size and same camera in both panels
- [ ] No text, letters, numbers or watermarks
- [ ] Grip, stance and joint angles match the form cues for that exercise

## Pilot: 10 exercises

| # | Exercise id (file name) | Equipment |
| --- | --- | --- |
| 1 | `push-up.png` | Bodyweight |
| 2 | `goblet-squat.png` | Dumbbell or kettlebell |
| 3 | `kettlebell-swing.png` | Kettlebell |
| 4 | `barbell-back-squat.png` | Barbell + rack |
| 5 | `dumbbell-romanian-deadlift.png` | Dumbbells |
| 6 | `lat-pulldown.png` | Cable machine |
| 7 | `band-pull-apart.png` | Resistance band |
| 8 | `glute-bridge.png` | Bodyweight |
| 9 | `dumbbell-shoulder-press.png` | Dumbbells + bench |
| 10 | `cable-triceps-pushdown.png` | Cable machine |

## Ready-to-paste prompts

Each one is the master template, already filled in. The form points come from the cues in the app.

### 1. push-up

```
Flat vector fitness illustration of the exercise "Push-Up", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
to highlight a small glow on the chest. No gradients, no shadows, no 3D, no photo-realism.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: none, just the floor.

START position: top of the push-up, arms fully straight, hands directly under the shoulders,
body in one straight line from head to heels, feet together on their toes.
END position: bottom of the push-up, chest a fist's height above the floor, elbows bent and angled about 45 degrees
back from the body (not flared out), body still in one straight line, hips not sagging or piking.

Anatomy and safety: exactly two arms and two legs, correct joints, neutral spine (no rounded or over-arched back),
realistic proportions. Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

### 2. goblet-squat

```
Flat vector fitness illustration of the exercise "Goblet Squat", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
to highlight the dumbbell and a small glow on the thighs. No gradients, no shadows, no 3D, no photo-realism.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: one single dumbbell held vertically against the chest, both hands cupping the top end. Nothing else.

START position: standing tall, feet shoulder-width apart, toes slightly out, dumbbell held at the chest
with elbows pointing down.
END position: deep squat, hips sitting down between the heels, thighs at or just below parallel to the floor,
chest up, back straight, knees pointing over the toes, heels flat on the floor, dumbbell still at the chest.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the dumbbell,
neutral spine (no rounded or over-arched back), realistic proportions.
Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

### 3. kettlebell-swing

```
Flat vector fitness illustration of the exercise "Kettlebell Swing", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
to highlight the kettlebell and a small glow on the glutes. No gradients, no shadows, no 3D, no photo-realism.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: one single kettlebell held with both hands by the handle. Nothing else.

START position: the hinge position, hips pushed far back, knees slightly bent, torso leaning forward about 45 degrees
with a flat straight back, arms straight, kettlebell hanging between the legs just behind the knees.
END position: standing fully tall, hips and knees fully extended, glutes squeezed, arms straight out in front at chest height,
kettlebell floating level with the chest.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the kettlebell handle,
neutral spine (no rounded or over-arched back), realistic proportions.
Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

### 4. barbell-back-squat

```
Flat vector fitness illustration of the exercise "Barbell Back Squat", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
to highlight the barbell and a small glow on the thighs. No gradients, no shadows, no 3D, no photo-realism.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: one barbell with round weight plates, resting across the upper back on the shoulders (not on the neck),
inside a simple squat rack with safety bars set at a low height. Nothing else.

START position: standing tall with the barbell on the upper back, feet shoulder-width apart, toes slightly out,
chest up, both hands gripping the bar.
END position: deep squat with thighs at or just below parallel, torso leaning forward slightly with a straight back,
chest up, knees over the toes, heels flat on the floor, barbell still on the upper back, safety bars just below the bar.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the bar,
neutral spine (no rounded or over-arched back), realistic proportions.
Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

### 5. dumbbell-romanian-deadlift

```
Flat vector fitness illustration of the exercise "Dumbbell Romanian Deadlift", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
to highlight the dumbbells and a small glow on the hamstrings and glutes. No gradients, no shadows, no 3D, no photo-realism.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: two dumbbells, one in each hand. Nothing else.

START position: standing tall, feet hip-width apart, knees softly bent, a dumbbell in each hand resting in front of the thighs.
END position: hips pushed far back, torso hinged forward until nearly parallel to the floor, back completely flat,
knees only slightly bent, dumbbells hanging close to the legs at about mid-shin, head in line with the spine.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the dumbbells,
neutral spine (no rounded or over-arched back), realistic proportions.
Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

### 6. lat-pulldown

```
Flat vector fitness illustration of the exercise "Lat Pulldown", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
to highlight the bar and a small glow on the lats. No gradients, no shadows, no 3D, no photo-realism.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: a lat pulldown machine with a seat, a thigh pad over the legs, a high pulley, and a long wide bar. Nothing else.

START position: seated upright with thighs under the pad, arms extended straight overhead gripping the bar
just outside shoulder width, chest up.
END position: bar pulled down to the upper chest, elbows pointing down and back, shoulder blades squeezed,
chest up, torso leaning back only slightly, not swinging.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the bar,
neutral spine (no rounded or over-arched back), realistic proportions.
Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

### 7. band-pull-apart

```
Flat vector fitness illustration of the exercise "Band Pull-Apart", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
to highlight the resistance band and a small glow on the upper back. No gradients, no shadows, no 3D, no photo-realism.

Camera: strict FRONT view (facing the viewer). The SAME athlete, same size and same camera in both panels.

Equipment: one flat resistance band held in both hands. Nothing else.

START position: standing tall, feet hip-width apart, both arms straight out in front at shoulder height,
hands about shoulder-width apart gripping the band, band slightly taut.
END position: arms pulled wide out to the sides at shoulder height, the band stretched across the chest,
shoulder blades squeezed together, arms still straight, shoulders down (not shrugged).

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the band,
neutral spine (no rounded or over-arched back), realistic proportions.
Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

### 8. glute-bridge

```
Flat vector fitness illustration of the exercise "Glute Bridge", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
for a thin exercise mat under the athlete and a small glow on the glutes. No gradients, no shadows, no 3D, no photo-realism.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: none, just a thin exercise mat on the floor.

START position: lying flat on the back, knees bent, feet flat on the floor close to the glutes, arms resting on the floor
by the sides, hips on the floor.
END position: hips lifted high so shoulders, hips and knees form one straight diagonal line, glutes squeezed,
lower back flat (not arched), feet flat, arms still on the floor, head and shoulders on the floor.

Anatomy and safety: exactly two arms and two legs, correct joints, neutral spine (no over-arched lower back),
realistic proportions. Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

### 9. dumbbell-shoulder-press

```
Flat vector fitness illustration of the exercise "Dumbbell Shoulder Press", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
to highlight the dumbbells and a small glow on the shoulders. No gradients, no shadows, no 3D, no photo-realism.

Camera: three-quarter front view. The SAME athlete, same size and same camera in both panels.

Equipment: two dumbbells, one in each hand, and a bench with an upright back support the athlete sits on. Nothing else.

START position: seated upright with the back against the support, feet flat on the floor, a dumbbell in each hand
held at shoulder height beside the ears, elbows pointing down and slightly forward, forearms vertical.
END position: both arms pressed fully overhead, dumbbells directly above the shoulders and nearly touching,
back flat against the support (not arched), core tight, elbows not locked out harshly.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the dumbbells,
neutral spine (no rounded or over-arched back), realistic proportions.
Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

### 10. cable-triceps-pushdown

```
Flat vector fitness illustration of the exercise "Cable Triceps Pushdown", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: simple, clean, flat-color vector illustration. One athlete, gender-neutral, short dark hair,
plain fitted dark-gray top and shorts, bare simple shoes, no facial detail. Skin tone mid-brown.
Dark near-black background (#09090c) with a subtle floor line. Use a bright lime-green (#d4ff3a) only
to highlight the cable and bar and a small glow on the triceps. No gradients, no shadows, no 3D, no photo-realism.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: a cable machine with the pulley at the top and a short straight bar attached. Nothing else.

START position: standing upright facing the machine, elbows tucked tight against the sides, hands gripping the bar
at chest height, forearms pointing up and slightly forward.
END position: arms pushed straight down, bar at the thighs, elbows still tucked against the sides and not moved forward,
shoulders down, torso upright.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the bar,
neutral spine (no rounded or over-arched back), realistic proportions.
Do NOT include any text, letters, numbers, arrows, logos or watermarks.
```

## After the pilot

Tell me which prompts needed changes and what you changed. I'll fold that into the master template, and then you can use it for the remaining exercises in batches of 15–20.
