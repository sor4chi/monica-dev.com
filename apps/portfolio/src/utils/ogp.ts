import path from 'node:path'

import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'

import { FONT_NAME } from '@/styles/fonts'

const OGP_WIDTH = 1200
const OGP_HEIGHT = 630
const FONT_SIZE = 65
const MAX_TITLE_WIDTH = OGP_WIDTH - FONT_SIZE * 2

GlobalFonts.registerFromPath(
  path.join(process.cwd(), 'public/fonts/GenInterfaceJPDisplay-SemiBold.ttf'),
  FONT_NAME,
)

export const createOgp = async (title: string) => {
  const canvas = createCanvas(OGP_WIDTH, OGP_HEIGHT)
  const ctx = canvas.getContext('2d')
  const baseImage = await loadImage(
    path.join(process.cwd(), 'public/assets/ogp/base.png'),
  )
  ctx.drawImage(baseImage, 0, 0, OGP_WIDTH, OGP_HEIGHT)
  ctx.font = `${FONT_SIZE}px "${FONT_NAME}", sans-serif`
  ctx.fillStyle = '#FFFFFF'
  ctx.textAlign = 'center'

  let titleLine = ''
  const titleLines = []
  const segmenterFr = new Intl.Segmenter('ja', { granularity: 'word' })
  const titleChunksIter = segmenterFr.segment(title)[Symbol.iterator]()
  const titleChunks = []
  for (const chunk of titleChunksIter) {
    titleChunks.push(chunk.segment)
  }
  titleChunks.forEach((chunk) => {
    if (ctx.measureText(titleLine + chunk).width > MAX_TITLE_WIDTH) {
      titleLines.push(titleLine)
      titleLine = ''
    }
    titleLine += chunk
  })
  titleLines.push(titleLine)
  titleLines.forEach((line, index) => {
    ctx.fillText(
      line,
      OGP_WIDTH / 2,
      OGP_HEIGHT / 2 +
        FONT_SIZE / 2 +
        FONT_SIZE * 1.5 * (index - titleLines.length / 2),
    )
  })

  return canvas.toBuffer('image/png')
}
