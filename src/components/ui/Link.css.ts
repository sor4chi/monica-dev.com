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
      cursor: "pointer",

      transition: "box-shadow 0.2s ease-in-out",

      ":hover": {
        backgroundColor: vars.color.gray[3],
      },
    },
  ]),
};
