import { focusInteraction } from "@/styles/common.css";
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
  icon: style({
    width: "1rem",
    height: "1rem",
  }),
};
