import { style } from "@vanilla-extract/css";
import { vars } from "design-system/theme.css";

import { BREAKPOINT_TABLET } from "@/styles/constants";

export const styles = {
  container: style({
    marginTop: vars.spacing.absolute[8],
  }),
  notPC: style({
    display: "none",

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_TABLET})`]: {
        display: "contents",
      },
    },
  }),
};
