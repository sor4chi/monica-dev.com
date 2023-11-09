import { style } from "@vanilla-extract/css";

import { CONTENTS_WITH_TOC } from "@/styles/constants";
import { vars } from "@/styles/theme.css";

export const styles = {
  onlySP: style({
    marginTop: vars.spacing.absolute[6],
    display: "none",

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        display: "block",
      },
    },
  }),
};
