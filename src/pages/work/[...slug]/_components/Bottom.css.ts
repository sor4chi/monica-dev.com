import { style } from "@vanilla-extract/css";

import { CONTENTS_WITH_TOC } from "@/styles/constants";

export const styles = {
  onlySP: style({
    display: "none",

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        display: "block",
      },
    },
  }),
};
