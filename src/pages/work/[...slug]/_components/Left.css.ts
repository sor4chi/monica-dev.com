import { style } from "@vanilla-extract/css";

import { CONTAINER_GAP, CONTENTS_MAX } from "../../../../styles/constants";
import { vars } from "@/styles/theme.css";

export const styles = {
  container: style({
    marginTop: vars.spacing.absolute[8],
  }),
  notPC: style({
    display: "none",

    "@media": {
      [`screen and (max-width: ${CONTENTS_MAX})`]: {
        display: "contents",
      },
    },
  }),
};
