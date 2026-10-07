# Exercise images: prompt template and pilot list (v2)

Goal: one image per exercise, showing the **start** and **end** position side by side. Saved as `public/exercises/<exercise-id>.png`.

## What changed in v2

- **Muscles in detail:** the working muscles are now drawn as anatomical shapes with visible fibre lines and two-tone shading. Primary muscles are strong lime, assisting muscles are a paler tint of the same colour.
- **Lighter body:** the rest of the body is a flat, pale neutral-gray mannequin (no clothes, hair or face), so the muscles stand out. Equipment is mid-gray so lime is reserved for muscles.
- **Angles:** each panel gets dashed reference lines, an arc and a number (for example `90°`) at the joints or body lines that matter for that exercise.
- **Camera:** the band pull-apart now uses a rear view so the back muscles face the viewer.

> Interpretation note: "lightened" is read as a lighter, paler body tone. If you meant fainter or more transparent, add: *"make the non-working body 30% more transparent"*.

## How to use

1. Open a **new ChatGPT chat** for each exercise.
2. Paste one of the ready-made prompts below (or the master template with the `{…}` parts filled in).
3. Check the result against the **checklist**. If something is wrong, say exactly what and ask for a fix while keeping everything else the same (see the tips below).
4. Save the final image as `<exercise-id>.png` (use the id exactly as shown in the table).
5. Upload the files to `public/exercises/` in the GitHub repo and tell me.

### Tips for fixing problems

- **Wrong or garbled labels:** *"Keep the image exactly the same, but fix the angle labels. They must read exactly: LEFT 180°, RIGHT 90°."*
- **Angle drawn doesn't match its number:** *"The knee in the right panel is bent about 120°, not 90°. Redraw so the thigh is parallel to the floor and the knee is a true 90°."*
- **Muscles too faint or too busy:** *"Make the primary muscle fibre lines more visible and keep the secondary muscles paler."*
- **Style drifting between exercises:** paste the first good image into the chat and say *"Use exactly this style, colours and mannequin for the next exercise."*

## Master template

```
Flat anatomical fitness illustration of the exercise "{EXERCISE NAME}", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: {PRIMARY MUSCLES, with their proper anatomical names}.
Secondary muscles: {SECONDARY MUSCLES}.

Camera: {CAMERA, usually "strict side view"; use a rear view for back exercises}. The SAME athlete, same size and same camera in both panels.

Equipment: {EQUIPMENT, exactly this and nothing else}. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: {START DESCRIPTION}.
END position: {END DESCRIPTION}.

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: {e.g. knee angle 180°}. RIGHT panel: {e.g. knee angle 90°, torso lean 30° from vertical}.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

## Checklist (reject the image if any of these fail)

- [ ] Exactly 2 arms, 2 legs, normal hands and feet
- [ ] Equipment is the right type and nothing extra
- [ ] Back is straight, not rounded or over-arched, in both panels
- [ ] Start and end are clearly different and match the descriptions
- [ ] Same mannequin, same size and same camera in both panels
- [ ] Primary muscles are lime with visible fibre lines; assisting muscles paler; the rest of the body flat light gray
- [ ] The muscles highlighted are the right ones for the exercise
- [ ] Every angle label shows the right number and the drawn angle looks like that number
- [ ] No other text, letters, numbers or watermarks

> The angles are typical working values for each position, not strict rules. Have a trainer review the final images before you publish them.

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

Each one is the master template, already filled in.

### 1. push-up

```
Flat anatomical fitness illustration of the exercise "Push-Up", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: pectoralis major (chest), with fibres fanning from the breastbone toward the upper arm.
Secondary muscles: anterior deltoids (front of shoulders), triceps, rectus abdominis (abs).

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: none, just the floor. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: top of the push-up, arms fully straight, hands directly under the shoulders, body in one straight line from head to heels, feet together on their toes.
END position: bottom of the push-up, chest a fist's height above the floor, elbows bent, body still in one straight line, hips not sagging or piking.

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: elbow angle 180° (arm straight). RIGHT panel: elbow angle 90°.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

### 2. goblet-squat

```
Flat anatomical fitness illustration of the exercise "Goblet Squat", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: quadriceps (rectus femoris and vastus lateralis) and gluteus maximus.
Secondary muscles: adductors, rectus abdominis (abs), calves.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: one single dumbbell held vertically against the chest, both hands cupping the top end; nothing else. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: standing tall, feet shoulder-width apart, toes slightly out, dumbbell held at the chest with elbows pointing down.
END position: deep squat, hips sitting down between the heels, thighs at or just below parallel to the floor, chest up, back straight, knees over the toes, heels flat on the floor, dumbbell still at the chest.

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: knee angle 180°. RIGHT panel: knee angle 90°, torso lean 30° from vertical.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

### 3. kettlebell-swing

```
Flat anatomical fitness illustration of the exercise "Kettlebell Swing", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: gluteus maximus and hamstrings (biceps femoris, semitendinosus).
Secondary muscles: erector spinae (lower back), rectus abdominis (abs), latissimus dorsi, rear and front deltoids.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: one single kettlebell held with both hands by the handle; nothing else. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: the hinge position: hips pushed far back, knees slightly bent, torso leaning forward with a flat straight back, arms straight, kettlebell hanging between the legs just behind the knees.
END position: standing fully tall, hips and knees fully extended, glutes squeezed, arms straight out in front at chest height, kettlebell floating level with the chest.

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: torso 45° from vertical, knee angle 140°. RIGHT panel: arms 90° from the torso.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

### 4. barbell-back-squat

```
Flat anatomical fitness illustration of the exercise "Barbell Back Squat", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: quadriceps (rectus femoris and vastus lateralis) and gluteus maximus.
Secondary muscles: hamstrings, adductors, erector spinae (lower back), rectus abdominis (abs).

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: one barbell with round weight plates resting across the upper back on the shoulders (not on the neck), inside a simple squat rack with safety bars set low; nothing else. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: standing tall with the barbell on the upper back, feet shoulder-width apart, toes slightly out, chest up, both hands gripping the bar.
END position: deep squat with thighs at or just below parallel, torso leaning forward with a straight back, chest up, knees over the toes, heels flat on the floor, barbell still on the upper back, safety bars just below the bar.

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: knee angle 180°. RIGHT panel: knee angle 90°, torso lean 40° from vertical.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

### 5. dumbbell-romanian-deadlift

```
Flat anatomical fitness illustration of the exercise "Dumbbell Romanian Deadlift", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: hamstrings (biceps femoris, semitendinosus, semimembranosus) and gluteus maximus.
Secondary muscles: erector spinae (lower back), trapezius and forearms (gripping).

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: two dumbbells, one in each hand; nothing else. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: standing tall, feet hip-width apart, knees softly bent, a dumbbell in each hand resting in front of the thighs.
END position: hips pushed far back, torso hinged forward until nearly parallel to the floor, back completely flat, knees only slightly bent, dumbbells hanging close to the legs at about mid-shin, head in line with the spine.

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: knee angle 175°. RIGHT panel: torso 20° above horizontal, knee angle 160°.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

### 6. lat-pulldown

```
Flat anatomical fitness illustration of the exercise "Lat Pulldown", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: latissimus dorsi (the wide muscle of the back, fibres running up toward the armpit).
Secondary muscles: biceps, rear deltoids, rhomboids and lower trapezius.

Camera: strict side view, with the latissimus dorsi drawn clearly on the visible side of the torso. The SAME athlete, same size and same camera in both panels.

Equipment: a lat pulldown machine with a seat, a thigh pad over the legs, a high pulley and a long wide bar; nothing else. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: seated upright with thighs under the pad, arms extended straight overhead gripping the bar just outside shoulder width, chest up.
END position: bar pulled down to the upper chest, elbows pointing down and back, shoulder blades squeezed, chest up, torso leaning back only slightly and not swinging.

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: elbow angle 170°. RIGHT panel: elbow angle 70°, torso lean back 15° from vertical.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

### 7. band-pull-apart

```
Flat anatomical fitness illustration of the exercise "Band Pull-Apart", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: rear deltoids and rhomboids / middle trapezius (the muscles between and across the shoulder blades).
Secondary muscles: infraspinatus and teres minor (rotator cuff), triceps.

Camera: three-quarter REAR view (athlete seen from behind and slightly to the side), so the upper-back muscles face the viewer. The SAME athlete, same size and same camera in both panels.

Equipment: one flat resistance band held in both hands; nothing else. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: standing tall, feet hip-width apart, both arms straight out in front at shoulder height, hands about shoulder-width apart gripping the band, band slightly taut.
END position: arms pulled wide out to the sides at shoulder height, the band stretched across the body, shoulder blades squeezed together, arms still straight, shoulders down (not shrugged).

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: elbow angle 180°. RIGHT panel: arms 90° from the torso.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

### 8. glute-bridge

```
Flat anatomical fitness illustration of the exercise "Glute Bridge", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: gluteus maximus.
Secondary muscles: hamstrings, rectus abdominis (abs), quadriceps.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: none, just a thin exercise mat on the floor. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: lying flat on the back, knees bent, feet flat on the floor close to the glutes, arms resting on the floor by the sides, hips on the floor.
END position: hips lifted high so shoulders, hips and knees form one straight diagonal line, glutes squeezed, lower back flat (not arched), feet flat, arms still on the floor, head and shoulders on the floor.

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: knee angle 90°. RIGHT panel: knee angle 90°, body line from shoulders to knees 25° above the floor.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

### 9. dumbbell-shoulder-press

```
Flat anatomical fitness illustration of the exercise "Dumbbell Shoulder Press", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: deltoids (anterior and lateral heads, with fibres visible).
Secondary muscles: triceps, upper pectoralis major, upper trapezius.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: two dumbbells, one in each hand, and a bench with a back support set slightly reclined that the athlete sits on; nothing else. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: seated with the back against the support, feet flat on the floor, a dumbbell in each hand held at shoulder height beside the ears, forearms vertical.
END position: both arms pressed fully overhead, dumbbells directly above the shoulders, back against the support (not arched), core tight, elbows not harshly locked out.

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: elbow angle 90°, bench back 80° from the floor. RIGHT panel: elbow angle 170°.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

### 10. cable-triceps-pushdown

```
Flat anatomical fitness illustration of the exercise "Cable Triceps Pushdown", drawn as TWO panels side by side
in one landscape image (3:2), separated by a thin gap. LEFT panel = START position. RIGHT panel = END position.

Style: clean, flat-color anatomical illustration with a medical-textbook feel. One athlete drawn as a smooth,
gender-neutral anatomy mannequin: no clothes, no hair, no facial features, in a flat LIGHT neutral gray (#c9ccd2) with only
very subtle shading. The rest of the body stays plain and pale on purpose so the working muscles stand out.
Near-black background (#09090c) with a faint floor line. No background gradients, no cast shadows, no 3D rendering,
no photo-realism.

Muscle detail: draw the PRIMARY working muscles as accurate anatomical muscle shapes in saturated lime-green (#d4ff3a),
with clearly visible muscle-fibre striation lines that follow the real fibre direction, a darker lime (#8fb31a) in the shadowed
parts and a brighter lime on the highlights, so both the shape and the fibre direction are easy to read.
Draw the SECONDARY (assisting) muscles in the same hue but paler and less saturated (about 40% strength), with fewer fibre lines.
Everything else stays flat light gray.
Primary muscles: triceps brachii (long head, lateral head and medial head, with fibres visible).
Secondary muscles: forearm flexors (gripping), rectus abdominis (abs), anterior deltoids.

Camera: strict side view. The SAME athlete, same size and same camera in both panels.

Equipment: a cable machine with the pulley at the top and a short straight bar attached; nothing else. Draw the equipment in mid-gray (#7b8089) with a thin white outline so it never competes with the muscles.

START position: standing upright facing the machine, elbows tucked tight against the sides, hands gripping the bar at chest height, forearms pointing up and slightly forward.
END position: arms pushed straight down, bar at the thighs, elbows still tucked against the sides and not moved forward, shoulders down, torso upright.

Angle indicators: for each requested angle, draw thin white dashed reference lines (a vertical line, a horizontal line, or the
straight extension of a limb) and a small white arc between the reference line and the body segment, with the number and a degree
sign (for example 90°) next to the arc in small, clean, sans-serif white text. The drawn angle must visually match its number.
Requested angles: LEFT panel: elbow angle 90°. RIGHT panel: elbow angle 170°, torso lean 10° from vertical.
Use ONLY these number labels; no other words or text anywhere.

Anatomy and safety: exactly two arms and two legs, correct joints, hands properly gripping the equipment, neutral spine
(no rounded or over-arched back), realistic proportions. Do NOT include any other text, letters, numbers, arrows, logos
or watermarks.
```

## After the pilot

Tell me which prompts needed changes and what you changed. I'll fold that into the master template, and then you can use it for the remaining exercises in batches of 15–20.
