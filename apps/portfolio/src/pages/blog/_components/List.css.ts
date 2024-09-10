import { style } from "@vanilla-extract/css";
import { vars } from "@sor4chi/design-system/theme.css";

import { BREAKPOINT_MOBILE } from "@/styles/constants";

export const styles = {
  container: style({
    width: "100%",
    position: "relative",
  }),
  title: style({
    position: "absolute",
    top: "50%",
    right: "100%",
    rotate: "-90deg",
    transform: "translateX(50%)",
    fontSize: vars.font.size.lg,
    color: vars.color.gray[9],
    fontWeight: 400,
    padding: `${vars.spacing.absolute[2]} 0`,
    marginBottom: vars.spacing.absolute[1],

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        rotate: "0deg",
        top: "0",
        left: "50%",
        right: "auto",
        transform: `translate(-50%, calc(-1 * ${vars.spacing.absolute[8]} - ${vars.font.size.xl}))`,
        background: vars.color.gray[1],
        padding: vars.spacing.absolute[3],
        fontSize: vars.font.size.sm,
        margin: 0,
      },
    },
  }),
  hideOnSP: style({
    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "none",
      },
    },
  }),
  listContainer: style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.absolute[2],
    listStyle: "none",
    padding: 0,
  }),
};
