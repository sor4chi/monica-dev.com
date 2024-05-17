import { style } from "@vanilla-extract/css";

import { BREAKPOINT_MOBILE } from "@/styles/constants";
import { vars } from "design-system/theme.css";

export const styles = {
  onlySP: style({
    marginTop: vars.spacing.absolute[6],
    display: "none",

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "block",
      },
    },
  }),
};
