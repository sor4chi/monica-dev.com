import { CONTENTS_MAX, CONTENTS_WITH_TOC } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const styles = {
  container: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
    marginBottom: "2rem",
  }),
  image: style({
    width: "8rem",
    height: "auto",
    borderRadius: "50%",

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        width: "6rem",
      },
    },
  }),
  title: style({
    fontSize: "2rem",
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
    marginBottom: "0.5rem",
    color: vars.color.gray[11],
  }),
};
