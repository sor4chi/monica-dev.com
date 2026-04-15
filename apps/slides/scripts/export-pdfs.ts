import { execSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

import glob from 'fast-glob'

const OUT_DIR = path.resolve(import.meta.dirname, '../dist-pdf')
const ROOT = path.resolve(import.meta.dirname, '..')

// Extra args are forwarded to slidev export (e.g. --dark)
const extraArgs = process.argv.slice(2).join(' ')

mkdirSync(OUT_DIR, { recursive: true })

const files = await glob('slides/*.md', { cwd: ROOT })

for (const file of files) {
  const basename = path.basename(file, '.md')
  const outPath = path.join(OUT_DIR, basename)

  console.log(`\n=== Exporting PDF: ${file} → ${outPath}.pdf ===\n`)

  execSync(`slidev export ${file} --output "${outPath}" ${extraArgs}`, {
    stdio: 'inherit',
    cwd: ROOT,
  })
}

console.log(`\nDone: ${files.length} PDFs exported to dist-pdf/`)
