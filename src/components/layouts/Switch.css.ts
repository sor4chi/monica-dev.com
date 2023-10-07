import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";
import { focusInteraction } from "@/styles/common.css";

export const styles = {
  rightTopArea: style({
    position: "fixed",
    top: vars.spacing.absolute[8],
    right: vars.spacing.absolute[8],
    zIndex: 1,
  }),
  button: style([
    focusInteraction,
    {
      position: "relative",
      width: "2.5rem",
      height: "2.5rem",
      border: "none",
      background: "transparent",
      borderRadius: vars.spacing.relative[2],
      boxSizing: "border-box",
      cursor: "pointer",
      fill: "none",
      stroke: vars.color.gray[11],
      overflow: "hidden",

      ":hover": {
        backgroundColor: vars.color.gray[3],
      },
    },
  ]),
  sun: style({
    position: "absolute",
    inset: 0,
    margin: "auto",
    display: "none",
  }),
  moon: style({
    position: "absolute",
    inset: 0,
    margin: "auto",
    display: "none",
  }),
};

globalStyle(`.light ${styles.sun}`, {
  display: "block",
});

globalStyle(`.dark ${styles.moon}`, {
  display: "block",
});
