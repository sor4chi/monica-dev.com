import { focusInteraction } from "@/styles/common.css";
import { CONTENTS_WITH_TOC } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const styles = {
  links: style({
    display: "flex",
    alignItems: "center",
    gap: vars.spacing.relative[4],
  }),
  btn: style([
    focusInteraction,
    {
      display: "flex",
      width: "2rem",
      height: "2rem",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      backgroundColor: vars.color.gray[3],
      cursor: "pointer",
      color: vars.color.gray[11],
      border: "none",

      "@media": {
        "(hover: hover)": {
          ":hover": {
            color: vars.color.gray[12],
            backgroundColor: vars.color.gray[4],
          },
        },
      },
    },
  ]),
  onlyPC: style({
    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        display: "none",
      },
    },
  }),
  icon: style({
    width: "1rem",
    height: "1rem",
  }),
};
