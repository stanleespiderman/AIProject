# WhatNext? Exercise Illustration Design Guide

**For the AI image generator.** This file is the permanent style guide for every exercise illustration in the WhatNext? fitness app. When I ask for an exercise image (for example "Make the image for goblet-squat"), always follow every rule below. Do not change the style between images. If something in my request conflicts with this guide, ask me before deviating.

---

## 1. What every image must be

- One image per exercise, **landscape 3:2** (for example 1536×1024), PNG.
- **Two panels side by side**, separated by a thin gap of background colour.
  - LEFT panel = **START** position.
  - RIGHT panel = **END** position.
- The **same athlete figure, same size, same camera angle** in both panels. Only the pose changes.
- Purpose: a person in the gym glances at it mid-workout and instantly understands the movement, the muscles it trains and the body angles. Clarity beats decoration.

## 2. The figure (the "mannequin")

- A smooth, **gender-neutral anatomy mannequin**: no clothes, no hair, no facial features, no skin-tone detail.
- Colour: a flat, **light neutral gray `#C9CCD2`**, with only very subtle shading. The body is deliberately pale and plain so the working muscles stand out.
- Realistic human proportions. Exactly **two arms, two legs**, correct joints, normal hands and feet.
- Neutral spine at all times: never rounded or over-arched, unless the exercise explicitly calls for it.

## 3. Muscles (the main feature)

- **Primary working muscles**: drawn as accurate anatomical muscle shapes in saturated **lime `#D4FF3A`**.
  - Show clearly visible **muscle-fibre striation lines** that follow the real fibre direction.
  - Use a darker lime **`#8FB31A`** in the shadowed parts and a brighter lime on highlights, so the shape reads in 3D-like form while staying flat vector.
- **Secondary (assisting) muscles**: the same lime hue but paler and less saturated (about 40% strength) with fewer fibre lines.
- Everything else: flat light gray `#C9CCD2`. Never highlight more muscles than the exercise needs.
- Use proper anatomical muscle names when thinking about shapes (pectoralis major, latissimus dorsi, gluteus maximus, rectus femoris, vastus lateralis, biceps femoris, triceps brachii, deltoids, rhomboids, rectus abdominis, erector spinae and so on).
- Lime is **reserved for muscles**. Nothing else in the image (equipment, lines, labels) may be lime.

## 4. Equipment

- Draw only the equipment named for the exercise. Nothing extra, no decorative gym background.
- Colour: **mid-gray `#7B8089`** with a thin **white outline**, so it never competes with the muscles.
- Equipment must look correct: a dumbbell is a dumbbell, a kettlebell is a kettlebell, a barbell has round plates, a resistance band is a flat band. Hands must grip it properly.
- If a rack, bench, machine or mat is needed, draw it simply and in the same mid-gray.

## 5. Background and layout

- Background: near-black **`#09090C`**, flat, with a faint floor line where relevant.
- No gradients in the background, no cast shadows, no 3D rendering, no photo-realism, no textures.
- Keep generous margin around the figure. Both panels the same scale.

## 6. Camera

- Default: **strict side view**, so joint angles and body lines are readable.
- Use a **three-quarter rear view** for exercises where the back muscles must face the viewer (for example band pull-apart).
- Never mix camera angles between the two panels of one image.

## 7. Angle indicators (important)

Every panel shows the body angles that matter for the form, so the viewer understands how upright, bent or inclined to be.

- Draw **thin white dashed reference lines**: a vertical line, a horizontal line, or the straight extension of a limb.
- Draw a **small white arc** between the reference line and the body segment.
- Put the number with a degree sign (for example `90°`) **next to the arc**, in small, clean, sans-serif **white** text.
- The drawn angle **must visually match the number**. A `90°` knee must look like a right angle.
- Typical things to label: knee angle, elbow angle, torso lean from vertical, torso angle above horizontal, arm angle from the torso.
- Maximum two or three labels per panel.
- **These number labels are the ONLY text allowed in the image.** No titles, captions, exercise names, muscle names, letters, logos or watermarks.

## 8. Safety and form rules

These images teach form, so a wrong picture can hurt someone. Never draw:

- A rounded or over-arched back during lifts.
- Knees collapsing inward, heels lifting during squats, locked-out elbows being slammed, or any unsafe position.
- Equipment resting on the neck (a barbell sits on the upper back/shoulders).
- Extra or missing limbs, merged hands, or equipment passing through the body.

If the exercise description would force an unsafe position, say so instead of drawing it.

## 9. Quality checklist (check before showing me)

1. Exactly 2 arms and 2 legs, normal hands and feet.
2. Right equipment, nothing extra, properly gripped.
3. Back neutral in both panels.
4. START and END clearly differ and match the description.
5. Same mannequin, size and camera in both panels.
6. Primary muscles lime with visible fibre lines; secondary muscles paler; rest light gray.
7. The highlighted muscles are the correct ones for this exercise.
8. Every angle label shows the right number and the angle drawn looks like that number.
9. No other text anywhere.

If any check fails, fix it before showing me. If I report a problem, change **only** that problem and keep everything else identical.

## 10. How I will ask

I will usually just name the exercise id. Look it up in section 11 and build the image from the spec. If I give a new exercise that is not in the list, I will provide: name, primary muscles, secondary muscles, camera, equipment, START, END and angles. If any of these is missing, ask me for it instead of guessing.

The file name I will save it as is `<exercise-id>.png`.

---

## 11. Exercise specs (pilot set)

Each entry gives everything needed to draw the image. Angles are typical working values.

### push-up: Push-Up
- **Camera:** strict side view
- **Equipment:** none, just the floor
- **Primary muscles:** pectoralis major (chest), fibres fanning from the breastbone toward the upper arm
- **Secondary muscles:** anterior deltoids, triceps, rectus abdominis
- **START:** top of the push-up, arms fully straight, hands under shoulders, body in one straight line from head to heels, feet together on toes
- **END:** bottom of the push-up, chest a fist's height above the floor, elbows bent, body still in one straight line, hips not sagging or piking
- **Angles:** LEFT elbow `180°` · RIGHT elbow `90°`

### goblet-squat: Goblet Squat
- **Camera:** strict side view
- **Equipment:** one dumbbell held vertically against the chest, both hands cupping the top end
- **Primary muscles:** quadriceps (rectus femoris, vastus lateralis), gluteus maximus
- **Secondary muscles:** adductors, rectus abdominis, calves
- **START:** standing tall, feet shoulder-width, toes slightly out, dumbbell at the chest, elbows down
- **END:** deep squat, hips down between the heels, thighs at or just below parallel, chest up, back straight, knees over toes, heels flat, dumbbell still at the chest
- **Angles:** LEFT knee `180°` · RIGHT knee `90°`, torso lean `30°` from vertical

### kettlebell-swing: Kettlebell Swing
- **Camera:** strict side view
- **Equipment:** one kettlebell held with both hands by the handle
- **Primary muscles:** gluteus maximus, hamstrings (biceps femoris, semitendinosus)
- **Secondary muscles:** erector spinae, rectus abdominis, latissimus dorsi, front and rear deltoids
- **START:** hinge position, hips far back, knees slightly bent, flat back leaning forward, arms straight, kettlebell between the legs just behind the knees
- **END:** standing fully tall, hips and knees extended, glutes squeezed, arms straight out at chest height, kettlebell floating level with the chest
- **Angles:** LEFT torso `45°` from vertical, knee `140°` · RIGHT arms `90°` from the torso

### barbell-back-squat: Barbell Back Squat
- **Camera:** strict side view
- **Equipment:** barbell with round plates across the upper back (not the neck), inside a simple squat rack with safety bars set low
- **Primary muscles:** quadriceps (rectus femoris, vastus lateralis), gluteus maximus
- **Secondary muscles:** hamstrings, adductors, erector spinae, rectus abdominis
- **START:** standing tall with the bar on the upper back, feet shoulder-width, toes slightly out, chest up, both hands on the bar
- **END:** deep squat, thighs at or just below parallel, torso leaning forward with a straight back, chest up, knees over toes, heels flat, safety bars just below the bar
- **Angles:** LEFT knee `180°` · RIGHT knee `90°`, torso lean `40°` from vertical

### dumbbell-romanian-deadlift: Dumbbell Romanian Deadlift
- **Camera:** strict side view
- **Equipment:** two dumbbells, one in each hand
- **Primary muscles:** hamstrings (biceps femoris, semitendinosus, semimembranosus), gluteus maximus
- **Secondary muscles:** erector spinae, trapezius, forearms
- **START:** standing tall, feet hip-width, knees softly bent, a dumbbell in each hand in front of the thighs
- **END:** hips pushed far back, torso hinged until nearly parallel to the floor, back flat, knees slightly bent, dumbbells close to the legs at mid-shin, head in line with the spine
- **Angles:** LEFT knee `175°` · RIGHT torso `20°` above horizontal, knee `160°`

### lat-pulldown: Lat Pulldown
- **Camera:** strict side view, latissimus dorsi drawn clearly on the visible side of the torso
- **Equipment:** lat pulldown machine with seat, thigh pad, high pulley and a long wide bar
- **Primary muscles:** latissimus dorsi (fibres running up toward the armpit)
- **Secondary muscles:** biceps, rear deltoids, rhomboids, lower trapezius
- **START:** seated upright, thighs under the pad, arms straight overhead gripping the bar just outside shoulder width, chest up
- **END:** bar pulled to the upper chest, elbows down and back, shoulder blades squeezed, chest up, torso leaning back only slightly
- **Angles:** LEFT elbow `170°` · RIGHT elbow `70°`, torso lean back `15°` from vertical

### band-pull-apart: Band Pull-Apart
- **Camera:** three-quarter REAR view, upper-back muscles facing the viewer
- **Equipment:** one flat resistance band held in both hands
- **Primary muscles:** rear deltoids, rhomboids and middle trapezius
- **Secondary muscles:** infraspinatus, teres minor, triceps
- **START:** standing tall, feet hip-width, arms straight out in front at shoulder height, hands shoulder-width apart on the band, band slightly taut
- **END:** arms pulled wide to the sides at shoulder height, band stretched, shoulder blades squeezed, arms straight, shoulders down (not shrugged)
- **Angles:** LEFT elbow `180°` · RIGHT arms `90°` from the torso

### glute-bridge: Glute Bridge
- **Camera:** strict side view
- **Equipment:** none, just a thin exercise mat
- **Primary muscles:** gluteus maximus
- **Secondary muscles:** hamstrings, rectus abdominis, quadriceps
- **START:** lying on the back, knees bent, feet flat close to the glutes, arms on the floor by the sides, hips on the floor
- **END:** hips lifted so shoulders, hips and knees form one straight diagonal line, glutes squeezed, lower back flat (not arched), head and shoulders on the floor
- **Angles:** LEFT knee `90°` · RIGHT knee `90°`, body line from shoulders to knees `25°` above the floor

### dumbbell-shoulder-press: Dumbbell Shoulder Press
- **Camera:** strict side view
- **Equipment:** two dumbbells, and a bench with a slightly reclined back support
- **Primary muscles:** deltoids (anterior and lateral heads, fibres visible)
- **Secondary muscles:** triceps, upper pectoralis major, upper trapezius
- **START:** seated with the back against the support, feet flat, a dumbbell in each hand at shoulder height beside the ears, forearms vertical
- **END:** both arms pressed fully overhead, dumbbells above the shoulders, back against the support (not arched), core tight, elbows not harshly locked
- **Angles:** LEFT elbow `90°`, bench back `80°` from the floor · RIGHT elbow `170°`

### cable-triceps-pushdown: Cable Triceps Pushdown
- **Camera:** strict side view
- **Equipment:** cable machine with the pulley at the top and a short straight bar
- **Primary muscles:** triceps brachii (long, lateral and medial heads, fibres visible)
- **Secondary muscles:** forearm flexors, rectus abdominis, anterior deltoids
- **START:** standing upright facing the machine, elbows tucked against the sides, hands on the bar at chest height, forearms pointing up and slightly forward
- **END:** arms pushed straight down, bar at the thighs, elbows still tucked at the sides, shoulders down, torso upright
- **Angles:** LEFT elbow `90°` · RIGHT elbow `170°`, torso lean `10°` from vertical
