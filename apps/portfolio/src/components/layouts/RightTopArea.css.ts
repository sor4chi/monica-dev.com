import { BREAKPOINT_MOBILE } from "@/styles/constants";
import { style } from "@vanilla-extract/css";
import { vars } from "design-system/theme.css";

export const styles = {
  rightTopArea: style({
    touchAction: "manipulation",
    position: "fixed",
    top: vars.spacing.absolute[8],
    right: vars.spacing.absolute[8],
    zIndex: vars.zIndex.windowFloat,

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        top: vars.spacing.absolute[4],
        right: vars.spacing.absolute[4],
      },
    },
  }),
};
