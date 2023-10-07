import { style } from '@vanilla-extract/css';

import { vars } from './theme.css';

export const focusInteraction = style({
  ':focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${vars.color.blue[8]}`,
  },
});
