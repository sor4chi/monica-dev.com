import { CONTENTS_MAX, CONTENTS_WITH_TOC } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

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

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        width: "6rem",
      },
    },
  }),
  title: style({
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",

    "@media": {
      [`screen and (max-width: ${CONTENTS_MAX})`]: {
        fontSize: "1.5rem",
      },
    },
  }),
  subtitle: style({
    fontSize: "1rem",
    fontWeight: "normal",
    color: vars.color.gray[11],
  }),
  socials: style({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
  }),
  social: style({
    width: "1.25rem",
    height: "1.25rem",
    padding: "0.25rem",
    color: vars.color.gray[11],
  }),
};
