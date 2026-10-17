#!/usr/bin/env node
/**
 * Adds `muscleParts` (the friendly, specific muscle names shown on the expanded
 * tile: "Upper chest", "Lats", "Mid traps"...) to every entry in
 * docs/data/whatnext-exercise-form-data.json.
 *
 *   node scripts/build-muscle-parts.mjs          # write the field
 *   node scripts/build-muscle-parts.mjs --check  # print mismatches against free-exercise-db, write nothing
 *
 * The anatomical names in `muscles` (written from NSCA / ACE / ExRx) are the input.
 * LABELS turns each one into the label a gym-goer recognises; PLAIN_PEC and
 * OVERRIDES hold the cases where the region depends on the exercise, not just the muscle.
 * Run `npm run build:details` afterwards.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "docs/data/whatnext-exercise-form-data.json");
const data = JSON.parse(readFileSync(file, "utf8"));

/** Anatomical phrase (lowercase, parentheses kept) to display label(s). First matching rule wins. */
const LABELS = [
  [/pectoralis major \(clavicular/, ["Upper chest"]],
  [/pectoralis major \(inner/, ["Inner chest"]],
  [/pectoralis major \(sternal \/ lower|pectoralis major \(lower/, ["Lower chest"]],
  [/upper pectoralis major/, ["Upper chest"]],
  [/pectoralis major/, ["Mid chest"]], // refined per exercise below
  [/anterior and rear deltoid/, ["Front delts", "Rear delts"]],
  [/anterior deltoid/, ["Front delts"]],
  [/lateral deltoid/, ["Side delts"]],
  [/rear deltoid/, ["Rear delts"]],
  [/^deltoids$/, ["Shoulders (all heads)"]],
  [/rotator cuff|infraspinatus|teres minor|supraspinatus/, ["Rotator cuff"]],
  [/triceps brachii \(long head\)/, ["Triceps (long head)"]],
  [/triceps brachii \(lateral and medial/, ["Triceps (outer and inner heads)"]],
  [/triceps brachii/, ["Triceps"]],
  [/anconeus/, ["Elbow extensors (anconeus)"]],
  [/biceps brachii \(long head\)/, ["Biceps (long head)"]],
  [/biceps brachii/, ["Biceps"]],
  [/brachialis/, ["Brachialis"]],
  [/brachioradialis/, ["Forearms (brachioradialis)"]],
  [/forearm flexors|forearms/, ["Forearms and grip"]],
  [/latissimus dorsi/, ["Lats"]],
  [/teres major/, ["Teres major"]],
  [/rhomboids/, ["Mid-back (rhomboids)"]],
  [/middle trapezius/, ["Mid traps"]],
  [/lower trapezius/, ["Lower traps"]],
  [/upper trapezius/, ["Upper traps"]],
  [/^trapezius$/, ["Traps"]],
  [/serratus anterior/, ["Serratus"]],
  [/erector spinae/, ["Lower back (erectors)"]],
  [/quadratus lumborum/, ["Deep side core (QL)"]],
  [/upper back/, ["Upper back"]],
  [/shoulder stabilisers/, ["Shoulder stabilisers"]],
  [/rectus femoris/, ["Quads (rectus femoris)"]],
  [/quadriceps/, ["Quads"]],
  [/gluteus maximus \(upper\)/, ["Upper glutes"]],
  [/gluteus maximus/, ["Glutes"]],
  [/gluteus medius|gluteus minimus/, ["Side glutes"]],
  [/deep hip rotators/, ["Deep hip rotators"]],
  [/tensor fasciae latae/, ["Outer hip (TFL)"]],
  [/hip flexors/, ["Hip flexors"]],
  [/adductor/, ["Inner thighs (adductors)"]],
  [/hamstrings/, ["Hamstrings"]],
  [/calves \(gastrocnemius\)/, ["Calves (gastrocnemius)"]],
  [/soleus/, ["Soleus (lower calf)"]],
  [/calves/, ["Calves"]],
  [/transversus abdominis/, ["Deep core (transverse abdominis)"]],
  [/rectus abdominis/, ["Abs"]],
  [/obliques/, ["Obliques"]],
  [/^core/, ["Core"]],
];

/**
 * Plain "pectoralis major" is Mid chest for most presses and flys. Where the
 * exercise's geometry moves the load, name the region instead.
 *  - Hands raised (incline push-up) loads the lower fibres; feet raised (decline push-up) the upper.
 *  - Close hands (close-grip bench, diamond push-up) load the inner fibres.
 *  - Dips and the pullover work the sternal (lower) fibres.
 */
const PLAIN_PEC = {
  "incline-push-up": "Lower chest",
  "close-grip-bench-press": "Inner chest",
  "diamond-push-up": "Inner chest",
  "dumbbell-pullover": "Lower chest",
  "bench-dip": "Lower chest",
  "machine-triceps-dip": "Lower chest",
};

/** Full replacements where the generated labels would be wrong or misleading. */
const OVERRIDES = {
  // Both heads of the triceps are trained, with the long head stretched overhead.
  "dumbbell-overhead-triceps-extension": { primary: ["Triceps (long head)"], secondary: ["Triceps (outer and inner heads)"] },
  "kettlebell-overhead-triceps-extension": { primary: ["Triceps (long head)"], secondary: ["Triceps (outer and inner heads)"] },
  "overhead-cable-triceps-extension": { primary: ["Triceps (long head)"], secondary: ["Triceps (outer and inner heads)", "Core"] },
};

const unique = (arr) => [...new Set(arr)];

function translate(phrase, id) {
  const p = phrase.toLowerCase().trim();
  for (const [re, labels] of LABELS) {
    if (!re.test(p)) continue;
    if (re.source === "pectoralis major" && PLAIN_PEC[id]) return [PLAIN_PEC[id]];
    return labels;
  }
  throw new Error(`${id}: no label for "${phrase}"`);
}

const parts = (list, id) => {
  const out = unique(list.flatMap((m) => translate(m, id)));
  // "Forearms and grip" adds nothing next to a named forearm muscle.
  return out.includes("Forearms (brachioradialis)") ? out.filter((l) => l !== "Forearms and grip") : out;
};

// ── free-exercise-db cross-check (coarse groups only) ──
const COARSE = [
  [/chest/, "chest"], [/delt|shoulder|rotator/, "shoulders"], [/triceps/, "triceps"],
  [/biceps|brachialis/, "biceps"], [/lats/, "lats"], [/mid-back|mid traps/, "middle back"],
  [/traps/, "traps"], [/lower back/, "lower back"], [/quads/, "quadriceps"], [/hamstrings/, "hamstrings"],
  [/glutes/, "glutes"], [/calves|soleus/, "calves"], [/inner thighs/, "adductors"],
  [/abs|core|obliques/, "abdominals"], [/forearm/, "forearms"],
];
const coarse = (label) => COARSE.filter(([re]) => re.test(label.toLowerCase())).map(([, g]) => g);

const checkOnly = process.argv.includes("--check");
const fedb = checkOnly
  ? JSON.parse(readFileSync(process.argv[process.argv.indexOf("--fedb") + 1], "utf8"))
  : null;
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const fedbIndex = fedb && new Map(fedb.map((x) => [norm(x.name), x]));

let mismatches = 0;
for (const e of data.exercises) {
  const musclePartsOut = OVERRIDES[e.id] ?? {
    primary: parts(e.muscles.primary, e.id),
    secondary: parts(e.muscles.secondary, e.id).filter((l) => !parts(e.muscles.primary, e.id).includes(l)),
  };
  if (checkOnly) {
    const match = fedbIndex.get(norm(e.name));
    if (match) {
      const mine = new Set(musclePartsOut.primary.flatMap(coarse));
      const theirs = new Set(match.primaryMuscles);
      const overlap = [...theirs].some((g) => mine.has(g));
      if (!overlap) {
        mismatches++;
        console.log(`${e.id}: ours=${[...mine]} fedb=${[...theirs]}`);
      }
    }
  } else {
    e.muscleParts = musclePartsOut;
  }
}

if (checkOnly) {
  console.log(`${mismatches} primary-muscle mismatches against free-exercise-db`);
} else {
  data.sources.NASM = "NASM Exercise Library (nasm.org/resource-center/exercise-library): clavicular vs sternal pec and glute regions";
  data.sources.BROOKBUSH = "Brookbush Institute systematic review of gluteus maximus regional activation (upper vs lower)";
  data.sources.TREBS2010 = "Trebs, Brandenburg & Pitney (2010), An electromyography analysis of 3 muscles surrounding the shoulder joint during the performance of a chest press at 3 angles of bench inclination";
  data.sources.LAUVER2016 = "Lauver, Cayot & Scheuermann (2016), Influence of bench angle on upper extremity muscular activation during bench press exercise";
  data.sources.LEHMAN2004 = "Lehman et al. (2004), Variations in muscle activation levels during traditional latissimus dorsi weight training exercises, Dynamic Medicine 3:4";
  data.musclePartsNote =
    "muscleParts holds the friendly region names shown on the expanded tile (first entries = main movers). " +
    "Derived from each entry's anatomical `muscles` by scripts/build-muscle-parts.mjs. Region claims for chest (upper / lower) " +
    "rest on mixed EMG evidence and need trainer sign-off like the rest of the form content.";
  writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`muscleParts written for ${data.exercises.length} exercises`);
}
