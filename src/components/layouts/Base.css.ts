import {
  CONTENTS_WITH_TOC,
  LAYOUT_CONTAINER_SIDE_PADDING,
  NAVIGATION_AREA_WIDTH,
} from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

const TOP_PADDING_LG = "10dvh";
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

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        minHeight: `calc(100dvh - ${TOP_PADDING_SM} - ${BOTTOM_PADDING})`,
        padding: `${TOP_PADDING_SM} ${LAYOUT_CONTAINER_SIDE_PADDING} ${BOTTOM_PADDING}`,
      },
    },
  }),
};

globalStyle(`${styles.container}.is-active`, {
  transform: `translateX(calc(-1 * ${NAVIGATION_AREA_WIDTH}))`,
  scale: 0.9,
  borderRadius: vars.spacing.absolute[4],
  boxShadow: `0 1rem 2rem ${vars.color.gray[3]}`,
  userSelect: "none",
  pointerEvents: "none",
});
