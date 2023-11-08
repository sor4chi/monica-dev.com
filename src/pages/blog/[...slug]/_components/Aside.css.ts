import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";
import {
  ASIDE_WIDTH,
  CONTENTS_MAX,
  CONTENTS_WITH_TOC,
} from "../../../../styles/constants";

export const styles = {
  aside: style({
    position: "sticky",
    top: `calc(${vars.spacing.absolute[8]} + 0.25rem)`,
    height: "fit-content",
    width: ASIDE_WIDTH,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
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
