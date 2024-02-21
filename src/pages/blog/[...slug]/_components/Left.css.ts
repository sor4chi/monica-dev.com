import { style } from "@vanilla-extract/css";

import { CONTAINER_GAP, BREAKPOINT_TABLET } from "../../../../styles/constants";
import { vars } from "@/styles/theme.css";

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
