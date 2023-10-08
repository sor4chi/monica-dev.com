import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import { ASIDE_WIDTH, CONTENTS_MAX, CONTENTS_WITH_TOC } from "./constants";

export const styles = {
  aside: style({
    position: "sticky",
    top: vars.spacing.relative[4],
    height: "fit-content",
    width: ASIDE_WIDTH,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: vars.spacing.absolute[8],
  }),
  left: style({
    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        display: "none",
      },
    },
  }),
  right: style({
    "@media": {
      [`screen and (max-width: ${CONTENTS_MAX})`]: {
        display: "none",
      },
    },
  }),
};
