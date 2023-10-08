import {
  CONTENTS_WITH_TOC,
  LAYOUT_CONTAINER_SIDE_PADDING,
} from "@/styles/constants";
import { style } from "@vanilla-extract/css";

const TOP_PADDING_LG = "10dvh";
const TOP_PADDING_SM = "1rem";
const BOTTOM_PADDING = "1rem";

export const styles = {
  container: style({
    minHeight: `calc(100dvh - ${TOP_PADDING_LG} - ${BOTTOM_PADDING})`,
    margin: "0 auto",
    padding: `${TOP_PADDING_LG} ${LAYOUT_CONTAINER_SIDE_PADDING} ${BOTTOM_PADDING}`,

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        minHeight: `calc(100dvh - ${TOP_PADDING_SM} - ${BOTTOM_PADDING})`,
        padding: `${TOP_PADDING_SM} ${LAYOUT_CONTAINER_SIDE_PADDING} ${BOTTOM_PADDING}`,
      },
    },
  }),
};
