import { execSync } from 'node:child_process'
import path from 'node:path'

import glob from 'fast-glob'

const files = await glob('slides/*.md')
const pwd = process.cwd()

for (const file of files) {
  const basename = path.basename(file, '.md')
  const outDir = path.join(pwd, 'dist', basename)

  console.log(`\n=== Building: ${file} → dist/${basename}/ ===\n`)

  execSync(`slidev build ${file} --out "${outDir}" --base "/${basename}/"`, {
    stdio: 'inherit',
    cwd: pwd,
  })
}

console.log(`\n=== All ${files.length} slides built ===`)
