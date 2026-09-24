import type { Exercise } from "@/lib/types";
import { youtubeSearchUrl } from "@/lib/youtube";

/**
 * The exercise library. To add one, copy an entry and edit it; see README > "Adding exercises".
 * `id` and `videoUrl` are derived from `name` unless you pass them explicitly.
 */
type ExerciseInput = Omit<Exercise, "id" | "videoUrl"> &
  Partial<Pick<Exercise, "id" | "videoUrl">>;

function ex(input: ExerciseInput): Exercise {
  return {
    ...input,
    id: input.id ?? slugify(input.name),
    videoUrl: input.videoUrl ?? youtubeSearchUrl(input.name),
  };
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const EXERCISES: Exercise[] = [
  // ───────────────────────── CHEST ─────────────────────────
  ex({
    name: "Dumbbell Bench Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "8–12",
    formCues: ["Pinch shoulder blades, feet planted", "Lower to mid-chest, elbows ~45°", "Press up and slightly together"],
  }),
  ex({
    name: "Incline Dumbbell Press",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders", "arms"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "8–10",
    formCues: ["Bench at 30–45°", "Lower to upper chest with control", "Don't let elbows flare past 60°"],
  }),
  ex({
    name: "Dumbbell Fly",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "10–12",
    formCues: ["Soft bend in elbows, keep it fixed", "Open wide until you feel a chest stretch", "Hug a big tree to come back up"],
  }),
  ex({
    name: "Dumbbell Floor Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Lie on the floor, knees bent", "Pause when triceps touch the floor", "Press up without bouncing"],
  }),
  ex({
    name: "Barbell Bench Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "5–8",
    formCues: ["Use a spotter or safety pins", "Touch lower chest, forearms vertical", "Drive feet into the floor as you press"],
  }),
  ex({
    name: "Incline Barbell Bench Press",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders", "arms"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "6–10",
    formCues: ["Bench at 30°, set safeties", "Bar path to upper chest", "Keep wrists stacked over elbows"],
  }),
  ex({
    name: "Kettlebell Floor Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "8–10/side",
    formCues: ["Bell rests on the back of the wrist", "Wrist straight, knuckles to ceiling", "Lower until the elbow kisses the floor"],
  }),
  ex({
    name: "Squeeze Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms"],
    equipment: ["kettlebell", "dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Squeeze the weight hard between both palms", "Press straight up from the chest", "Keep squeezing all the way down"],
  }),
  ex({
    name: "Cable Crossover",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders"],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12–15",
    formCues: ["Staggered stance, slight forward lean", "Sweep hands down and together", "Squeeze for a second, return slowly"],
  }),
  ex({
    name: "Low-to-High Cable Fly",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Pulleys at the lowest setting", "Scoop up to chin height", "Lead with the hands, not the shoulders"],
  }),
  ex({
    name: "Standing Cable Chest Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "core"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Split stance, brace your core", "Press forward, don't lean in", "Let the handles back to chest level"],
  }),
  ex({
    name: "Machine Chest Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Handles level with mid-chest", "Back flat against the pad", "Stop just short of locking out"],
  }),
  ex({
    name: "Pec Deck",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Seat so handles sit at chest height", "Bring pads together with chest, not arms", "Slow 3-second return"],
  }),
  ex({
    name: "Band Chest Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Anchor band behind you at chest height", "Step forward until there's tension", "Press out, control the return"],
  }),
  ex({
    name: "Band Chest Fly",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
    formCues: ["Arms wide, elbows softly bent", "Bring hands together in an arc", "Keep shoulders down and back"],
  }),
  ex({
    name: "Push-Up",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders", "core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "10–15",
    formCues: ["Body in one straight line", "Chest to a fist's height off the floor", "Elbows ~45°, not flared"],
  }),
  ex({
    name: "Incline Push-Up",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Hands on a bench or box", "Squeeze glutes to keep hips level", "Touch chest to the edge"],
  }),
  ex({
    name: "Decline Push-Up",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders", "arms"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "8–12",
    formCues: ["Feet on a bench, hands on the floor", "Don't let hips pike or sag", "Lower slowly, press hard"],
  }),
  ex({
    name: "Chest Dip",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["bodyweight"], difficulty: "advanced", sets: 3, reps: "6–10",
    formCues: ["Lean torso forward slightly", "Lower until shoulders are level with elbows", "Stop if you feel shoulder pain"],
  }),

  ex({
    name: "Barbell Floor Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "6–8",
    formCues: ["Set up in a rack with pins at floor height", "Pause when upper arms touch the floor", "Press explosively, wrists straight"],
  }),
  ex({
    name: "Kettlebell Push-Up",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "core"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 3, reps: "8–12",
    formCues: ["Grip two upright bells by the handles", "Lower past your hands for a deeper stretch", "Keep the bells from tipping"],
  }),
  ex({
    name: "Smith Machine Bench Press",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["machines"], difficulty: "intermediate", sets: 3, reps: "8–10",
    formCues: ["Set the safety stops just above your chest", "Bar touches lower chest", "Twist the bar off the hooks, don't jerk it"],
  }),
  ex({
    name: "Incline Machine Press",
    primaryMuscle: "chest", secondaryMuscles: ["shoulders", "arms"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Handles line up with upper chest", "Press up and out", "Control the handles back"],
  }),
  ex({
    name: "Banded Push-Up",
    primaryMuscle: "chest", secondaryMuscles: ["arms", "core"],
    equipment: ["bands"], difficulty: "intermediate", sets: 3, reps: "8–12",
    formCues: ["Band across your upper back, ends under your hands", "Body in one straight line", "Push hard against the band at the top"],
  }),

  // ───────────────────────── BACK ─────────────────────────
  ex({
    name: "One-Arm Dumbbell Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12/side",
    formCues: ["Hand and knee on bench, flat back", "Pull elbow toward your hip", "Don't twist your torso to cheat"],
  }),
  ex({
    name: "Chest-Supported Dumbbell Row",
    primaryMuscle: "back", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Lie chest-down on an incline bench", "Row both elbows back and squeeze", "Chest stays glued to the pad"],
  }),
  ex({
    name: "Dumbbell Pullover",
    primaryMuscle: "back", secondaryMuscles: ["chest", "core"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "10–12",
    formCues: ["Hold one dumbbell with both hands over chest", "Lower behind head with soft elbows", "Keep ribs down, don't arch"],
  }),
  ex({
    name: "Barbell Bent-Over Row",
    primaryMuscle: "back", secondaryMuscles: ["arms", "glutes"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "6–10",
    formCues: ["Hinge to ~45°, neutral spine", "Pull bar to lower ribs", "No jerking the torso up"],
  }),
  ex({
    name: "Pendlay Row",
    primaryMuscle: "back", secondaryMuscles: ["arms", "legs"],
    equipment: ["barbell"], difficulty: "advanced", sets: 4, reps: "5–6",
    formCues: ["Torso nearly parallel to the floor", "Bar starts on the floor each rep", "Explode up, set it down controlled"],
  }),
  ex({
    name: "Single-Arm Kettlebell Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "10/side",
    formCues: ["Staggered stance, hand on bench", "Row the bell to your hip", "Shoulder away from your ear"],
  }),
  ex({
    name: "Kettlebell Gorilla Row",
    primaryMuscle: "back", secondaryMuscles: ["arms", "core"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 3, reps: "8/side",
    formCues: ["Wide stance, two bells between feet", "Hinge, back flat", "Row one bell while pushing into the other"],
  }),
  ex({
    name: "Seated Cable Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Sit tall, slight knee bend", "Pull handle to belly button", "Let shoulders stretch forward at the end"],
  }),
  ex({
    name: "Straight-Arm Cable Pulldown",
    primaryMuscle: "back", secondaryMuscles: ["core"],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12–15",
    formCues: ["Hinge slightly, arms long", "Sweep the bar down to your thighs", "Feel it in the lats, not the triceps"],
  }),
  ex({
    name: "Lat Pulldown",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["machines", "cables"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Grip just outside shoulders", "Pull bar to upper chest", "Chest up, don't swing back"],
  }),
  ex({
    name: "Machine Seated Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Chest against the pad", "Drive elbows back", "Pause and squeeze shoulder blades"],
  }),
  ex({
    name: "Assisted Pull-Up",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "8–10",
    formCues: ["More assistance = lighter", "Pull chin over the bar", "Lower all the way with control"],
  }),
  ex({
    name: "Band Pull-Apart",
    primaryMuscle: "back", secondaryMuscles: ["shoulders"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15–20",
    formCues: ["Arms straight at shoulder height", "Pull the band to your chest", "Squeeze shoulder blades together"],
  }),
  ex({
    name: "Band Seated Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Loop band around your feet", "Sit tall, pull to your waist", "Slow on the way back"],
  }),
  ex({
    name: "Band Lat Pulldown",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Anchor the band high", "Kneel and pull elbows to your sides", "Keep chest proud"],
  }),
  ex({
    name: "Pull-Up",
    primaryMuscle: "back", secondaryMuscles: ["arms", "core"],
    equipment: ["bodyweight"], difficulty: "advanced", sets: 3, reps: "5–8",
    formCues: ["Start from a dead hang", "Pull elbows down to your ribs", "Chin over the bar, no kipping"],
  }),
  ex({
    name: "Chin-Up",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "5–8",
    formCues: ["Palms facing you, shoulder width", "Lead with the chest", "Lower all the way down"],
  }),
  ex({
    name: "Inverted Row",
    primaryMuscle: "back", secondaryMuscles: ["arms", "core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "8–12",
    formCues: ["Hang under a bar or smith bar", "Body straight like a plank", "Pull chest to the bar"],
  }),
  ex({
    name: "Superman",
    primaryMuscle: "back", secondaryMuscles: ["glutes"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "12",
    formCues: ["Lie face down, arms overhead", "Lift arms and legs a few inches", "Hold 2 seconds, neck neutral"],
  }),

  ex({
    name: "T-Bar Row",
    primaryMuscle: "back", secondaryMuscles: ["arms"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8–10",
    formCues: ["Bar end in a landmine or corner, straddle it", "Hinge with a flat back", "Row the handle to your chest"],
  }),

  // ───────────────────────── SHOULDERS ─────────────────────────
  ex({
    name: "Dumbbell Shoulder Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "8–12",
    formCues: ["Seated or standing, brace your core", "Press up without arching your back", "Lower to ear height"],
  }),
  ex({
    name: "Dumbbell Lateral Raise",
    primaryMuscle: "shoulders", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Go light, slight elbow bend", "Raise to shoulder height, no higher", "Lead with elbows, not hands"],
  }),
  ex({
    name: "Dumbbell Rear Delt Fly",
    primaryMuscle: "shoulders", secondaryMuscles: ["back"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Hinge forward, flat back", "Open arms out to the sides", "Don't shrug"],
  }),
  ex({
    name: "Arnold Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "8–10",
    formCues: ["Start palms facing you at chin", "Rotate palms out as you press", "Reverse the path on the way down"],
  }),
  ex({
    name: "Barbell Overhead Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms", "core"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "5–8",
    formCues: ["Squeeze glutes, ribs down", "Move your head back, then press through", "Finish with bar over mid-foot"],
  }),
  ex({
    name: "Landmine Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["chest", "core"],
    equipment: ["barbell"], difficulty: "beginner", sets: 3, reps: "8–10/side",
    formCues: ["One end of the bar wedged in a corner", "Press up and forward in an arc", "Keep hips square"],
  }),
  ex({
    name: "Kettlebell Overhead Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms", "core"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 3, reps: "6–8/side",
    formCues: ["Start from the rack position", "Press up, bicep finishes by your ear", "Don't lean away from the bell"],
  }),
  ex({
    name: "Kettlebell Halo",
    primaryMuscle: "shoulders", secondaryMuscles: ["core"],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "6 each way",
    formCues: ["Hold the bell upside down by the horns", "Circle it tight around your head", "Keep your core braced"],
  }),
  ex({
    name: "Kettlebell Bottoms-Up Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms", "core"],
    equipment: ["kettlebell"], difficulty: "advanced", sets: 3, reps: "5/side",
    formCues: ["Bell upside down, crush the handle", "Stack wrist, elbow, shoulder", "Press slowly, go light"],
  }),
  ex({
    name: "Cable Lateral Raise",
    primaryMuscle: "shoulders", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12–15/side",
    formCues: ["Low pulley, cable across your body", "Raise out to shoulder height", "Control the lowering"],
  }),
  ex({
    name: "Face Pull",
    primaryMuscle: "shoulders", secondaryMuscles: ["back"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Rope at upper-chest height", "Pull to your face, hands apart", "Finish with thumbs pointing back"],
  }),
  ex({
    name: "Cable Front Raise",
    primaryMuscle: "shoulders", secondaryMuscles: ["chest"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12",
    formCues: ["Face away from a low pulley", "Raise straight arms to eye level", "No swinging from the hips"],
  }),
  ex({
    name: "Machine Shoulder Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Handles start at shoulder height", "Back against the pad", "Press without locking elbows hard"],
  }),
  ex({
    name: "Reverse Pec Deck",
    primaryMuscle: "shoulders", secondaryMuscles: ["back"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Face the pad, arms straight", "Sweep handles back and out", "Keep shoulders down"],
  }),
  ex({
    name: "Machine Lateral Raise",
    primaryMuscle: "shoulders", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Align shoulders with the pivot", "Raise elbows to shoulder height", "Slow on the way down"],
  }),
  ex({
    name: "Band Overhead Press",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Stand on the band, handles at shoulders", "Press straight overhead", "Ribs down, glutes tight"],
  }),
  ex({
    name: "Band Lateral Raise",
    primaryMuscle: "shoulders", secondaryMuscles: [],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
    formCues: ["Stand on the band's middle", "Raise hands out to shoulder height", "Pause at the top"],
  }),
  ex({
    name: "Band Face Pull",
    primaryMuscle: "shoulders", secondaryMuscles: ["back"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
    formCues: ["Anchor at face height", "Pull hands beside your ears", "Squeeze upper back"],
  }),
  ex({
    name: "Pike Push-Up",
    primaryMuscle: "shoulders", secondaryMuscles: ["arms"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "6–10",
    formCues: ["Hips high, body in an upside-down V", "Lower head toward the floor in front of hands", "Press back up to the V"],
  }),
  ex({
    name: "Plank to Downward Dog",
    primaryMuscle: "shoulders", secondaryMuscles: ["core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "10",
    formCues: ["Start in a high plank", "Push hips up and back", "Return to plank with control"],
  }),

  ex({
    name: "Prone Y-T-W Raise",
    primaryMuscle: "shoulders", secondaryMuscles: ["back"],
    equipment: ["bodyweight", "dumbbells"], difficulty: "beginner", sets: 3, reps: "5 of each letter",
    formCues: ["Lie face down, thumbs up", "Lift arms into Y, then T, then W", "Squeeze shoulder blades, neck relaxed"],
  }),

  // ───────────────────────── ARMS ─────────────────────────
  ex({
    name: "Dumbbell Biceps Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Elbows pinned to your sides", "Curl up, squeeze at the top", "Lower for a slow 3 count"],
  }),
  ex({
    name: "Hammer Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Palms face each other", "No swinging the torso", "Full range, top to bottom"],
  }),
  ex({
    name: "Incline Dumbbell Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "10",
    formCues: ["Sit back on a 45–60° bench", "Arms hang straight down", "Curl without moving the elbows forward"],
  }),
  ex({
    name: "Dumbbell Overhead Triceps Extension",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Hold one dumbbell overhead with both hands", "Lower behind your head, elbows in", "Ribs down, don't arch"],
  }),
  ex({
    name: "Dumbbell Skull Crusher",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "10–12",
    formCues: ["Lie flat, arms straight over shoulders", "Bend elbows to bring bells beside your head", "Upper arms stay still"],
  }),
  ex({
    name: "Barbell Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["barbell"], difficulty: "beginner", sets: 3, reps: "8–12",
    formCues: ["Shoulder-width underhand grip", "Stand tall, no hip swing", "Lower all the way down"],
  }),
  ex({
    name: "Close-Grip Bench Press",
    primaryMuscle: "arms", secondaryMuscles: ["chest", "shoulders"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "6–10",
    formCues: ["Hands just inside shoulder width", "Elbows tucked close to your sides", "Use safeties or a spotter"],
  }),
  ex({
    name: "Barbell Skull Crusher",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8–10",
    formCues: ["Use an EZ or light straight bar", "Lower to your forehead slowly", "Elbows point to the ceiling"],
  }),
  ex({
    name: "Kettlebell Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Hold the bell by the horns", "Elbows stay at your sides", "Squeeze at the top"],
  }),
  ex({
    name: "Kettlebell Overhead Triceps Extension",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Hold horns, bell behind your head", "Elbows point forward", "Extend fully overhead"],
  }),
  ex({
    name: "Cable Triceps Pushdown",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Elbows tucked at your sides", "Push down until arms are straight", "Only the forearms move"],
  }),
  ex({
    name: "Cable Biceps Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12",
    formCues: ["Low pulley, straight bar", "Curl up, keep elbows still", "Constant tension on the way down"],
  }),
  ex({
    name: "Overhead Cable Triceps Extension",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12",
    formCues: ["Face away from the pulley with a rope", "Elbows by your ears", "Extend forward and up"],
  }),
  ex({
    name: "Machine Preacher Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Armpits snug on the pad", "Curl without lifting off", "Don't slam the bottom"],
  }),
  ex({
    name: "Machine Triceps Dip",
    primaryMuscle: "arms", secondaryMuscles: ["chest"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Sit upright, grip the handles", "Push down until arms are straight", "Elbows track back, not out"],
  }),
  ex({
    name: "Band Biceps Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
    formCues: ["Stand on the band", "Curl up, elbows fixed", "Resist the band on the way down"],
  }),
  ex({
    name: "Band Triceps Pushdown",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
    formCues: ["Anchor the band high", "Elbows glued to your sides", "Lock out and squeeze"],
  }),
  ex({
    name: "Bench Dip",
    primaryMuscle: "arms", secondaryMuscles: ["chest", "shoulders"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Hands on a bench behind you", "Lower until elbows reach ~90°", "Keep hips close to the bench"],
  }),
  ex({
    name: "Diamond Push-Up",
    primaryMuscle: "arms", secondaryMuscles: ["chest"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "8–12",
    formCues: ["Hands together under your chest", "Elbows brush your ribs", "Drop to knees if form breaks"],
  }),

  ex({
    name: "Kettlebell Hammer Curl",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "10/side",
    formCues: ["Hold the handle with a neutral grip", "Bell hangs below the hand", "Curl without swinging"],
  }),
  ex({
    name: "Machine Triceps Extension",
    primaryMuscle: "arms", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12",
    formCues: ["Elbows lined up with the pivot", "Extend fully and squeeze", "Slow return"],
  }),

  // ───────────────────────── LEGS ─────────────────────────
  ex({
    name: "Goblet Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes", "core"],
    equipment: ["dumbbells", "kettlebell"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Hold the weight at your chest", "Sit between your heels, chest up", "Knees track over toes"],
  }),
  ex({
    name: "Dumbbell Walking Lunge",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10/side",
    formCues: ["Long step, torso tall", "Back knee hovers above the floor", "Push through the front heel"],
  }),
  ex({
    name: "Dumbbell Bulgarian Split Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "8/side",
    formCues: ["Back foot laces-down on a bench", "Drop straight down", "Front heel stays planted"],
  }),
  ex({
    name: "Dumbbell Step-Up",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10/side",
    formCues: ["Whole foot on a knee-height box", "Drive up through the top leg", "Step down slowly"],
  }),
  ex({
    name: "Barbell Back Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes", "core"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "5–8",
    formCues: ["Squat inside a rack with safeties set", "Brace, then sit down between your hips", "Drive up, chest leads"],
  }),
  ex({
    name: "Barbell Front Squat",
    primaryMuscle: "legs", secondaryMuscles: ["core", "glutes"],
    equipment: ["barbell"], difficulty: "advanced", sets: 4, reps: "5–6",
    formCues: ["Bar rests on front delts, elbows high", "Stay upright through the squat", "Set safeties before you start"],
  }),
  ex({
    name: "Barbell Reverse Lunge",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8/side",
    formCues: ["Step back, not out to the side", "Lower until back knee nearly touches", "Drive up through the front foot"],
  }),
  ex({
    name: "Double Kettlebell Front Squat",
    primaryMuscle: "legs", secondaryMuscles: ["core", "glutes"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 3, reps: "8",
    formCues: ["Bells in the rack position", "Elbows tucked, chest up", "Squat to depth you control"],
  }),
  ex({
    name: "Kettlebell Reverse Lunge",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "8/side",
    formCues: ["Hold the bell at your chest", "Step back and drop straight down", "Front knee stays over the foot"],
  }),
  ex({
    name: "Cable Goblet Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12",
    formCues: ["Hold a rope at your chest from a low pulley", "Lean back slightly into the cable", "Sit deep, stand tall"],
  }),
  ex({
    name: "Leg Press",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Feet shoulder width, mid-platform", "Lower until knees reach ~90°", "Don't lock knees at the top"],
  }),
  ex({
    name: "Leg Extension",
    primaryMuscle: "legs", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Knee lined up with the pivot", "Extend fully, squeeze quads", "Slow on the way down"],
  }),
  ex({
    name: "Lying Leg Curl",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Pad just above your heels", "Hips stay pressed into the bench", "Curl, pause, lower slowly"],
  }),
  ex({
    name: "Hack Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["machines"], difficulty: "intermediate", sets: 3, reps: "8–10",
    formCues: ["Back and shoulders flat on the pads", "Lower under control", "Push through the whole foot"],
  }),
  ex({
    name: "Machine Calf Raise",
    primaryMuscle: "legs", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Balls of feet on the edge", "Full stretch at the bottom", "Pause at the top"],
  }),
  ex({
    name: "Band Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
    formCues: ["Stand on the band, handles at shoulders", "Squat down, chest up", "Drive up against the tension"],
  }),
  ex({
    name: "Band Good Morning",
    primaryMuscle: "legs", secondaryMuscles: ["glutes", "back"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Band under feet, loop behind neck", "Hinge at hips, soft knees", "Stand up by squeezing glutes"],
  }),
  ex({
    name: "Bodyweight Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "15–20",
    formCues: ["Feet shoulder width", "Sit back and down, arms forward", "Heels stay on the floor"],
  }),
  ex({
    name: "Reverse Lunge",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "10/side",
    formCues: ["Step back into the lunge", "Both knees bend to ~90°", "Push back up through the front heel"],
  }),
  ex({
    name: "Jump Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "8–10",
    formCues: ["Quarter-to-half squat, then explode", "Land softly on the balls of your feet", "Reset before each rep"],
  }),
  ex({
    name: "Wall Sit",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "30–45s",
    formCues: ["Back flat on the wall", "Thighs parallel to the floor", "Knees over ankles"],
  }),
  ex({
    name: "Box Pistol Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes", "core"],
    equipment: ["bodyweight"], difficulty: "advanced", sets: 3, reps: "5/side",
    formCues: ["Stand on one leg in front of a box", "Sit back to touch the box", "Stand up without rocking"],
  }),
  ex({
    name: "Standing Calf Raise",
    primaryMuscle: "legs", secondaryMuscles: [],
    equipment: ["bodyweight", "dumbbells"], difficulty: "beginner", sets: 3, reps: "15–20",
    formCues: ["Balls of feet on a step", "Lower heels below the step", "Rise high, pause"],
  }),

  ex({
    name: "Cable Split Squat",
    primaryMuscle: "legs", secondaryMuscles: ["glutes"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "10/side",
    formCues: ["Hold handles from low pulleys at your sides", "Staggered stance, drop straight down", "Front knee tracks over toes"],
  }),
  ex({
    name: "Standing Cable Leg Curl",
    primaryMuscle: "legs", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12/side",
    formCues: ["Ankle strap on a low pulley, face the stack", "Curl heel toward your glute", "Thigh stays still"],
  }),

  // ───────────────────────── GLUTES ─────────────────────────
  ex({
    name: "Dumbbell Romanian Deadlift",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "back"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Push hips back, soft knees", "Dumbbells slide down your thighs", "Stop when your back wants to round"],
  }),
  ex({
    name: "Dumbbell Hip Thrust",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["dumbbells"], difficulty: "beginner", sets: 3, reps: "12",
    formCues: ["Upper back on a bench, dumbbell on hips", "Drive hips up to a straight line", "Chin tucked, squeeze at the top"],
  }),
  ex({
    name: "Barbell Hip Thrust",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "8–10",
    formCues: ["Pad the bar across your hips", "Shins vertical at the top", "Ribs down, don't over-arch"],
  }),
  ex({
    name: "Barbell Romanian Deadlift",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "back"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8–10",
    formCues: ["Bar stays in contact with your legs", "Hinge until hamstrings are stretched", "Flat back the whole time"],
  }),
  ex({
    name: "Barbell Glute Bridge",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["barbell"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Lie on the floor, bar over hips", "Drive through heels", "Hold the top for a second"],
  }),
  ex({
    name: "Kettlebell Swing",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "core", "back"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 4, reps: "15",
    formCues: ["It's a hinge, not a squat", "Snap hips forward to float the bell", "Arms are just ropes"],
  }),
  ex({
    name: "Kettlebell Sumo Deadlift",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "back"],
    equipment: ["kettlebell"], difficulty: "beginner", sets: 3, reps: "12",
    formCues: ["Wide stance, toes turned out", "Weight between your feet", "Stand tall, squeeze glutes"],
  }),
  ex({
    name: "Single-Leg Romanian Deadlift",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "core"],
    equipment: ["kettlebell", "dumbbells"], difficulty: "intermediate", sets: 3, reps: "8/side",
    formCues: ["Hinge on one leg, other leg reaches back", "Hips stay square to the floor", "Use a wall for balance if needed"],
  }),
  ex({
    name: "Cable Pull-Through",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Face away from a low pulley, rope between legs", "Hinge back, then drive hips forward", "Squeeze glutes at lockout"],
  }),
  ex({
    name: "Cable Glute Kickback",
    primaryMuscle: "glutes", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12/side",
    formCues: ["Ankle strap on a low pulley", "Kick back without arching your low back", "Pause at the top"],
  }),
  ex({
    name: "Cable Hip Abduction",
    primaryMuscle: "glutes", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "beginner", sets: 3, reps: "12/side",
    formCues: ["Ankle strap on the outside leg", "Sweep the leg out to the side", "Keep torso upright"],
  }),
  ex({
    name: "Hip Abduction Machine",
    primaryMuscle: "glutes", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "15",
    formCues: ["Sit tall or lean slightly forward", "Push knees out", "Control the return"],
  }),
  ex({
    name: "45-Degree Back Extension",
    primaryMuscle: "glutes", secondaryMuscles: ["back", "legs"],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Pad just below your hip crease", "Round slightly and squeeze glutes to rise", "Stop in a straight line, don't hyperextend"],
  }),
  ex({
    name: "Band Glute Bridge",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
    formCues: ["Mini band above your knees", "Push knees out as you bridge up", "Hold 2 seconds at the top"],
  }),
  ex({
    name: "Band Lateral Walk",
    primaryMuscle: "glutes", secondaryMuscles: ["legs"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12 steps/side",
    formCues: ["Mini band around ankles or knees", "Half squat, chest up", "Step wide, don't let feet snap together"],
  }),
  ex({
    name: "Band Clamshell",
    primaryMuscle: "glutes", secondaryMuscles: [],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15/side",
    formCues: ["Lie on your side, knees bent", "Keep feet together, open top knee", "Don't roll your hips back"],
  }),
  ex({
    name: "Glute Bridge",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "15",
    formCues: ["Feet flat, close to your glutes", "Press hips up to a straight line", "Squeeze, don't arch your low back"],
  }),
  ex({
    name: "Single-Leg Glute Bridge",
    primaryMuscle: "glutes", secondaryMuscles: ["legs", "core"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "10/side",
    formCues: ["One foot planted, other leg straight", "Drive up through the planted heel", "Keep hips level"],
  }),
  ex({
    name: "Donkey Kick",
    primaryMuscle: "glutes", secondaryMuscles: ["core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "15/side",
    formCues: ["On all fours, knee bent at 90°", "Press the foot toward the ceiling", "No arching through the low back"],
  }),

  // ───────────────────────── CORE ─────────────────────────
  ex({
    name: "Plank",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "30–45s",
    formCues: ["Elbows under shoulders", "Squeeze glutes, tuck ribs", "Breathe, don't hold your breath"],
  }),
  ex({
    name: "Side Plank",
    primaryMuscle: "core", secondaryMuscles: ["glutes", "shoulders"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "20–30s/side",
    formCues: ["Elbow under shoulder", "Hips high, body in a line", "Stack or stagger your feet"],
  }),
  ex({
    name: "Dead Bug",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "8/side",
    formCues: ["Low back pressed into the floor", "Extend opposite arm and leg slowly", "Exhale as you reach"],
  }),
  ex({
    name: "Hollow Body Hold",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "20–30s",
    formCues: ["Low back glued to the floor", "Arms and legs long, just off the ground", "Bend knees to make it easier"],
  }),
  ex({
    name: "Hanging Knee Raise",
    primaryMuscle: "core", secondaryMuscles: ["arms"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "10–12",
    formCues: ["Dead hang, shoulders engaged", "Curl knees up toward chest", "No swinging between reps"],
  }),
  ex({
    name: "Mountain Climber",
    primaryMuscle: "core", secondaryMuscles: ["shoulders", "legs"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "30s",
    formCues: ["High plank, hands under shoulders", "Drive knees toward chest", "Hips stay level"],
  }),
  ex({
    name: "Weighted Russian Twist",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["dumbbells", "kettlebell"], difficulty: "intermediate", sets: 3, reps: "10/side",
    formCues: ["Lean back, chest tall", "Rotate from your ribs, not arms", "Keep feet down if needed"],
  }),
  ex({
    name: "Suitcase Carry",
    primaryMuscle: "core", secondaryMuscles: ["arms", "shoulders"],
    equipment: ["dumbbells", "kettlebell"], difficulty: "beginner", sets: 3, reps: "30 m/side",
    formCues: ["Heavy weight in one hand", "Walk tall, don't lean", "Slow, steady steps"],
  }),
  ex({
    name: "Barbell Rollout",
    primaryMuscle: "core", secondaryMuscles: ["shoulders", "back"],
    equipment: ["barbell"], difficulty: "advanced", sets: 3, reps: "6–8",
    formCues: ["Kneel with plates on the bar", "Roll out only as far as you keep a flat back", "Pull back with your abs"],
  }),
  ex({
    name: "Landmine Rotation",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8/side",
    formCues: ["Hold the bar end at arm's length", "Arc it hip to hip", "Pivot the back foot, keep arms long"],
  }),
  ex({
    name: "Kettlebell Windmill",
    primaryMuscle: "core", secondaryMuscles: ["shoulders", "glutes"],
    equipment: ["kettlebell"], difficulty: "advanced", sets: 3, reps: "5/side",
    formCues: ["Bell locked out overhead, eyes on it", "Push hip out, slide free hand down leg", "Go light and slow"],
  }),
  ex({
    name: "Cable Woodchop",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "10/side",
    formCues: ["High pulley, rotate down across your body", "Pivot the back foot", "Arms stay long, core does the work"],
  }),
  ex({
    name: "Pallof Press",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["cables", "bands"], difficulty: "beginner", sets: 3, reps: "10/side",
    formCues: ["Stand side-on to the anchor", "Press hands straight out from chest", "Resist the twist"],
  }),
  ex({
    name: "Kneeling Cable Crunch",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12–15",
    formCues: ["Kneel, rope beside your head", "Crunch ribs toward hips", "Hips stay still"],
  }),
  ex({
    name: "Ab Crunch Machine",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Start light", "Curl your torso down, don't yank with arms", "Slow return"],
  }),
  ex({
    name: "Captain's Chair Leg Raise",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "intermediate", sets: 3, reps: "10–12",
    formCues: ["Back pressed into the pad", "Raise knees to hip height or higher", "Lower without swinging"],
  }),
  ex({
    name: "Band Woodchop",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12/side",
    formCues: ["Anchor band high to one side", "Rotate down and across", "Control the band back"],
  }),

  ex({
    name: "Weighted Woodchop",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["dumbbells", "kettlebell"], difficulty: "beginner", sets: 3, reps: "10/side",
    formCues: ["Hold one weight with both hands", "Rotate from outside knee to opposite shoulder", "Pivot the back foot"],
  }),
  ex({
    name: "Rotary Torso Machine",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["machines"], difficulty: "beginner", sets: 3, reps: "10/side",
    formCues: ["Go light, this is about control", "Rotate from your ribs", "Slow in both directions"],
  }),
  ex({
    name: "Banded Dead Bug",
    primaryMuscle: "core", secondaryMuscles: ["shoulders"],
    equipment: ["bands"], difficulty: "intermediate", sets: 3, reps: "8/side",
    formCues: ["Band anchored behind your head, arms pulling it overhead", "Low back pressed down", "Extend one leg at a time"],
  }),
  ex({
    name: "Band Kneeling Crunch",
    primaryMuscle: "core", secondaryMuscles: [],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "15",
    formCues: ["Anchor the band high, kneel facing it", "Crunch ribs toward hips", "Hips stay stacked over knees"],
  }),

  // ───────────────────────── FULL BODY ─────────────────────────
  ex({
    name: "Dumbbell Thruster",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "shoulders"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "10",
    formCues: ["Dumbbells at shoulders, squat down", "Drive up and press overhead in one move", "Don't let knees cave"],
  }),
  ex({
    name: "Dumbbell Renegade Row",
    primaryMuscle: "fullBody", secondaryMuscles: ["back", "core"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "8/side",
    formCues: ["Plank on the dumbbells, feet wide", "Row one side, don't rotate hips", "Use hex dumbbells so they don't roll"],
  }),
  ex({
    name: "Dumbbell Clean and Press",
    primaryMuscle: "fullBody", secondaryMuscles: ["shoulders", "legs", "glutes"],
    equipment: ["dumbbells"], difficulty: "intermediate", sets: 3, reps: "8",
    formCues: ["Hinge, then pop the bells to your shoulders", "Dip slightly, press overhead", "Lower in two steps"],
  }),
  ex({
    name: "Barbell Deadlift",
    primaryMuscle: "fullBody", secondaryMuscles: ["back", "glutes", "legs"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 4, reps: "5",
    formCues: ["Bar over mid-foot, shins close", "Brace hard, push the floor away", "Stand tall, don't lean back"],
  }),
  ex({
    name: "Barbell Thruster",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "shoulders"],
    equipment: ["barbell"], difficulty: "advanced", sets: 3, reps: "6–8",
    formCues: ["Bar in front rack, elbows up", "Front squat then drive it overhead", "Keep it light and fast"],
  }),
  ex({
    name: "Landmine Squat to Press",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "shoulders", "core"],
    equipment: ["barbell"], difficulty: "intermediate", sets: 3, reps: "8/side",
    formCues: ["Hold the bar end at your chest", "Squat, then drive up and press in one move", "Keep your torso tall"],
  }),
  ex({
    name: "Kettlebell Clean and Press",
    primaryMuscle: "fullBody", secondaryMuscles: ["shoulders", "glutes"],
    equipment: ["kettlebell"], difficulty: "intermediate", sets: 3, reps: "6/side",
    formCues: ["Hinge and clean the bell to the rack", "Keep it close so it doesn't flip onto your wrist", "Press from a braced stance"],
  }),
  ex({
    name: "Turkish Get-Up",
    primaryMuscle: "fullBody", secondaryMuscles: ["core", "shoulders"],
    equipment: ["kettlebell", "dumbbells"], difficulty: "advanced", sets: 3, reps: "2/side",
    formCues: ["Eyes on the weight the whole time", "Move step by step, no rushing", "Learn it unloaded first"],
  }),
  ex({
    name: "Farmer's Carry",
    primaryMuscle: "fullBody", secondaryMuscles: ["core", "arms", "back"],
    equipment: ["dumbbells", "kettlebell"], difficulty: "beginner", sets: 3, reps: "30–40 m",
    formCues: ["Heavy weight in each hand", "Shoulders back, walk tall", "Short, quick steps"],
  }),
  ex({
    name: "Cable Squat to Row",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "back"],
    equipment: ["cables"], difficulty: "intermediate", sets: 3, reps: "12",
    formCues: ["Handles at chest height", "Squat down with arms long", "Stand and row in one move"],
  }),
  ex({
    name: "Rowing Machine Sprint",
    primaryMuscle: "fullBody", secondaryMuscles: ["back", "legs"],
    equipment: ["machines"], difficulty: "beginner", sets: 5, reps: "250 m",
    formCues: ["Legs, then hips, then arms", "Reverse the order on the way back", "Rest 60s between sprints"],
  }),
  ex({
    name: "Air Bike Sprint",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs"],
    equipment: ["machines"], difficulty: "beginner", sets: 6, reps: "20s on / 40s off",
    formCues: ["Push and pull the handles", "Stay seated, sit tall", "Go hard, then recover fully"],
  }),
  ex({
    name: "Band Thruster",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "shoulders"],
    equipment: ["bands"], difficulty: "beginner", sets: 3, reps: "12–15",
    formCues: ["Stand on the band, handles at shoulders", "Squat, then press overhead as you stand", "Smooth, continuous reps"],
  }),
  ex({
    name: "Burpee",
    primaryMuscle: "fullBody", secondaryMuscles: ["chest", "legs", "core"],
    equipment: ["bodyweight"], difficulty: "intermediate", sets: 3, reps: "8–10",
    formCues: ["Hands down, jump feet back to plank", "Chest to floor optional", "Jump feet in and hop up"],
  }),
  ex({
    name: "Bear Crawl",
    primaryMuscle: "fullBody", secondaryMuscles: ["core", "shoulders"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "20 m",
    formCues: ["Knees hover an inch off the floor", "Opposite hand and foot move together", "Back flat like a table"],
  }),
  ex({
    name: "Inchworm",
    primaryMuscle: "fullBody", secondaryMuscles: ["core", "shoulders", "legs"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "8",
    formCues: ["Fold forward, hands to the floor", "Walk hands out to a plank", "Walk feet back toward hands"],
  }),
  ex({
    name: "Squat Thrust",
    primaryMuscle: "fullBody", secondaryMuscles: ["legs", "core"],
    equipment: ["bodyweight"], difficulty: "beginner", sets: 3, reps: "10–12",
    formCues: ["Squat, hands to the floor", "Jump or step feet back to plank", "Return and stand fully"],
  }),
];
