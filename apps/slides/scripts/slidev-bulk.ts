import { exec } from 'node:child_process'

import glob from 'fast-glob'

const files = await glob('slides/*.md')
const pwd = process.cwd()

const BUILD = (file: string, basename: string) =>
  `slidev build ${file} --out "${pwd}/dist/${basename}" --base "${basename}"`

for (const file of files) {
  const res = exec(BUILD(file, file.replace(/.*\/(?<name>.*)\.md/, '$<name>')))
  res.stdout?.pipe(process.stdout)
  res.stderr?.pipe(process.stderr)
}
