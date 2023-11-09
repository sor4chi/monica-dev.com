import { focusInteraction } from "@/styles/common.css";
import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const styles = {
  link: style([
    focusInteraction,
    {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: vars.spacing.relative[2],
      textDecoration: "none",

      color: vars.color.gray[11],
      border: "none",
      borderRadius: vars.spacing.relative[2],
      padding: `${vars.spacing.relative[2]} ${vars.spacing.relative[2]}`,
      boxSizing: "border-box",
      width: "fit-content",
      cursor: "pointer",

      transition: "box-shadow 0.2s ease-in-out, color 0.2s ease-in-out",

      "@media": {
        "(hover: hover)": {
          ":hover": {
            backgroundColor: vars.color.gray[3],
            color: vars.color.gray[12],
          },
        },
      },

      ":focus-visible": {
        color: vars.color.gray[12],
      },
    },
  ]),
};
