import { BREAKPOINT_MOBILE } from "@/styles/constants";
import { style } from "@vanilla-extract/css";
import { vars } from "design-system/theme.css";

export const styles = {
  container: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: "1.5rem",
    marginBottom: "2rem",
  }),
  image: style({
    width: "4rem",
    height: "auto",
    borderRadius: "50%",
  }),
  info: style({
    display: "flex",
    gap: "1rem",

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        flexDirection: "column",
        gap: "0.5rem",
      },
    },
  }),
  title: style({
    fontSize: "1.25rem",
    fontWeight: vars.font.weight.bold,
    marginBottom: "0.5rem",
  }),
  subtitle: style({
    fontSize: "1rem",
    fontWeight: vars.font.weight.normal,
    color: vars.color.gray[11],
  }),
  socials: style({
    display: "inline-flex",
    alignItems: "center",
  }),
  socialLink: style({
    color: vars.color.gray[11],

    transition: "color 0.2s",

    "@media": {
      "(hover: hover)": {
        ":hover": {
          color: vars.color.gray[12],
        },
      },
    },

    ":focus-visible": {
      color: vars.color.gray[12],
    },
  }),
  social: style({
    width: "1.25rem",
    height: "1.25rem",
    padding: "0.5rem",
  }),
};
