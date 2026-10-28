import { focusInteraction } from '@sor4chi/design-system/common.css'
import { vars } from '@sor4chi/design-system/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

export const styles = {
  button: style([
    focusInteraction,
    {
      position: 'relative',
      width: '2.5rem',
      height: '2.5rem',
      border: 'none',
      background: 'transparent',
      borderRadius: vars.spacing.relative[2],
      boxSizing: 'border-box',
      cursor: 'pointer',
      overflow: 'hidden',
      '@media': {
        '(hover: hover)': {
          ':hover': {
            backgroundColor: vars.color.gray[3],
          },
        },
      },
    },
  ]),
  icon: style({
    position: 'absolute',
    inset: 0,
    margin: 'auto',
    width: '1.5rem',
    height: '1.5rem',
    fill: 'none',
    stroke: vars.color.gray[10],
    strokeWidth: 2,
    strokeLinecap: 'round',
    // Snap horizontal strokes consistently at fractional browser zoom levels.
    shapeRendering: 'crispEdges',
  }),
  lines: style({
    transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
    selectors: {
      '&:nth-child(1)': { transformOrigin: '12px 4px' },
      '&:nth-child(3)': { transformOrigin: '12px 20px' },
    },
  }),
}

globalStyle(
  `body:has(#backward:popover-open) ${styles.button} ${styles.lines}:nth-child(1)`,
  {
    transform: 'translateY(8px) rotate(45deg)',
  },
)

globalStyle(
  `body:has(#backward:popover-open) ${styles.button} ${styles.lines}:nth-child(2)`,
  {
    opacity: 0,
  },
)

globalStyle(
  `body:has(#backward:popover-open) ${styles.button} ${styles.lines}:nth-child(3)`,
  {
    transform: 'translateY(-8px) rotate(-45deg)',
  },
)

globalStyle(`body:has(#backward:popover-open) ${styles.icon}`, {
  shapeRendering: 'geometricPrecision',
})
