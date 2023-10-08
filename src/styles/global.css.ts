import { globalStyle } from '@vanilla-extract/css';

import { colorVars } from './contract.css';

globalStyle('body', {
  backgroundColor: colorVars.gray[1],
  fontFamily:
    'X, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  margin: 0,
  padding: 0,
  color: colorVars.gray[12],

  minHeight: '100vh',
  height: '100%',
});

globalStyle('html', {
  scrollPaddingTop: '50dvh',
  scrollBehavior: 'smooth',
});

globalStyle('*', {
  margin: 0,
  fontSmooth: 'always',
  WebkitFontSmoothing: 'antialiased',
});
