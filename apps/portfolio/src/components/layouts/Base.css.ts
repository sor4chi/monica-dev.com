import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "@sor4chi/design-system/theme.css";

import {
  BREAKPOINT_MOBILE,
  LAYOUT_CONTAINER_SIDE_PADDING,
  NAVIGATION_AREA_WIDTH,
} from "@/styles/constants";

export const TOP_PADDING_LG = "10dvh";
const TOP_PADDING_SM = "1rem";
const BOTTOM_PADDING = "1rem";

export const styles = {
  container: style({
    minHeight: `calc(100dvh - ${TOP_PADDING_LG} - ${BOTTOM_PADDING})`,
    margin: "0 auto",
    padding: `${TOP_PADDING_LG} ${LAYOUT_CONTAINER_SIDE_PADDING} ${BOTTOM_PADDING}`,
    backgroundColor: vars.color.gray[1],
    transition:
      "transform 0.3s cubic-bezier(0.76, 0, 0.24, 1), scale 0.3s cubic-bezier(0.76, 0, 0.24, 1), border-radius 0.3s cubic-bezier(0.76, 0, 0.24, 1)",
    position: "relative",

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        minHeight: `calc(100dvh - ${TOP_PADDING_SM} - ${BOTTOM_PADDING})`,
        padding: `${TOP_PADDING_SM} ${LAYOUT_CONTAINER_SIDE_PADDING} ${BOTTOM_PADDING}`,
      },
    },
  }),
};

globalStyle(`${styles.container}.is-active`, {
  transform: `translateX(calc(-1 * ${NAVIGATION_AREA_WIDTH}))`,
  // scale: 0.9,
  borderRadius: vars.spacing.absolute[4],
  // boxShadow: `0 1rem 2rem ${vars.color.gray[3]}`,
  userSelect: "none",
  pointerEvents: "none",
});

globalStyle(`${styles.container}::before`, {
  content: "''",
  position: "absolute",
  display: "block",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: vars.color.gray[1],
  zIndex: vars.zIndex.float,
  opacity: 0,
  transition: "opacity 0.3s cubic-bezier(0.76, 0, 0.24, 1)",
  pointerEvents: "none",
});

globalStyle(`${styles.container}.is-active::before`, {
  opacity: 0.7,
});
