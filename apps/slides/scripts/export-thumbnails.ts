import { execSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

import glob from "fast-glob";

const PORTFOLIO_SLIDES_DIR = path.resolve(
  import.meta.dirname,
  "../../portfolio/public/assets/slides",
);
const TMP_DIR = path.resolve(import.meta.dirname, "../.tmp-export");
const ROOT = path.resolve(import.meta.dirname, "..");

// Extra args are forwarded to slidev export (e.g. --dark)
const extraArgs = process.argv.slice(2).join(" ");

const files = await glob("slides/*.md", { cwd: ROOT });

for (const file of files) {
  const basename = path.basename(file, ".md");
  const outPath = path.join(PORTFOLIO_SLIDES_DIR, `${basename}.png`);

  console.log(`\nExporting thumbnail: ${file} → ${outPath}`);

  mkdirSync(TMP_DIR, { recursive: true });

  execSync(
    `slidev export ${file} --format png --range 1 --output "${TMP_DIR}" ${extraArgs}`,
    { stdio: "inherit", cwd: ROOT },
  );

  cpSync(path.join(TMP_DIR, "1.png"), outPath);
  rmSync(TMP_DIR, { recursive: true });
}

console.log(`\nDone: ${files.length} thumbnails exported`);
