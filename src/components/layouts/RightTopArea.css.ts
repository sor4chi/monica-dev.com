import { CONTENTS_WITH_TOC } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const styles = {
  rightTopArea: style({
    touchAction: "manipulation",
    position: "fixed",
    top: vars.spacing.absolute[8],
    right: vars.spacing.absolute[8],
    zIndex: vars.zIndex.windowFloat,

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        top: vars.spacing.absolute[4],
        right: vars.spacing.absolute[4],
      },
    },
  }),
};
