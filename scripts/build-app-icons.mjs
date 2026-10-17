#!/usr/bin/env node
/**
 * Draws the home-screen app icons (public/icons/*.png) from one SVG.
 *
 *   node scripts/build-app-icons.mjs
 *
 * Needs Playwright with a Chromium (PLAYWRIGHT_MODULE and CHROMIUM_PATH can point at them).
 * The PNGs are committed, so this only needs re-running when the design changes.
 */
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/icons");
const playwright = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");
const { chromium } = playwright.default ?? playwright;

// Ink square, two volt "next" chevrons. Kept inside the central 80% so Android's
// maskable crop never clips it.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#09090c"/>
  <g fill="none" stroke="#d4ff3a" stroke-width="58" stroke-linecap="round" stroke-linejoin="round">
    <path d="M142 150 L262 256 L142 362"/>
    <path d="M254 150 L374 256 L254 362"/>
  </g>
</svg>`;

const sizes = { "icon-192.png": 192, "icon-512.png": 512, "icon-maskable-512.png": 512, "apple-touch-icon.png": 180 };

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH, args: ["--no-sandbox"] });
for (const [file, size] of Object.entries(sizes)) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<style>html,body{margin:0;background:#09090c}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
  await page.screenshot({ path: join(outDir, file) });
  await page.close();
}
await browser.close();
console.log(`Wrote ${Object.keys(sizes).length} icons to public/icons`);
