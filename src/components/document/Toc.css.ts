import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const styles = {
  toc: style({
    display: "flex",
    flexDirection: "column",
    fontSize: vars.font.size.sm,
    paddingLeft: vars.spacing.relative[4],
    width: vars.spacing.full,
    boxSizing: "border-box",
    marginTop: vars.spacing.relative[2],

    "@container": {
      "(max-width: 768px)": {
        display: "none",
      },
    },
  }),
  tocItem: style({
    listStyle: "none",
  }),
  link: style({
    width: vars.spacing.full,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    textDecoration: "none",

    color: vars.color.gray[11],
    border: "none",
    padding: vars.spacing.relative[2],
    lineHeight: "1.25rem",
    boxSizing: "border-box",
    cursor: "pointer",
    outline: "none",

    transition: "color 0.2s ease-in-out",

    "@media": {
      "(hover: hover)": {
        ":hover": {
          color: vars.color.blue[9],
        },
      },
    },

    ":focus-visible": {
      color: vars.color.blue[9],
    },
  }),
};

globalStyle(".toc-active", {
  color: vars.color.gray[12],
});
