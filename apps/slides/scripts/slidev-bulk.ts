import { spawn } from 'node:child_process'
import { glob } from 'node:fs/promises'
import path from 'node:path'

const files = (await Array.fromAsync(glob('slides/*.md'))).sort()

for (const file of files) {
  const name = path.basename(file, '.md')
  await new Promise<void>((resolve, reject) => {
    const child = spawn(
      'slidev',
      [
        'build',
        file,
        '--out',
        path.resolve('dist', name),
        '--base',
        `/${name}/`,
      ],
      { stdio: 'inherit' },
    )
    child.once('error', reject)
    child.once('exit', (code, signal) => {
      if (code === 0) resolve()
      else
        reject(new Error(`Slide build failed for ${file}: ${signal ?? code}`))
    })
  })
}
