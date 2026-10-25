import { vars } from '@sor4chi/design-system/theme.css'
import { globalStyle } from '@vanilla-extract/css'

import { FONT_FAMILY } from './fonts'

globalStyle('body', {
  backgroundColor: vars.color.gray[2],
  fontFamily: FONT_FAMILY,
  fontSize: vars.font.size.base,
  margin: 0,
  padding: 0,
  color: vars.color.gray[11],

  minHeight: '100dvh',
  height: '100%',
})

if (process.env.NODE_ENV === 'production') {
  globalStyle('html', {
    scrollBehavior: 'smooth',
  })
}

globalStyle('html', {
  scrollPaddingTop: '30dvh',
})

globalStyle('*', {
  margin: 0,
  fontSmooth: 'always',
  WebkitFontSmoothing: 'antialiased',
})

globalStyle('::selection', {
  backgroundColor: vars.color.gray[5],
})

globalStyle('button, input, select, textarea', {
  fontFamily: 'inherit',
})

globalStyle('.light', { colorScheme: 'light' })
globalStyle('.dark', { colorScheme: 'dark' })
globalStyle('*, *::before, *::after', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms !important',
      animationIterationCount: '1 !important',
      transitionDuration: '0.01ms !important',
    },
  },
})

globalStyle('html', {
  '@media': { '(prefers-reduced-motion: reduce)': { scrollBehavior: 'auto' } },
})
