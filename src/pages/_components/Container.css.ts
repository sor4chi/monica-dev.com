import { CONTENTS_WITH_TOC } from "@/styles/constants";
import { style } from "@vanilla-extract/css";

export const styles = {
  container: style({
    maxWidth: "64rem",
    width: "100%",
    margin: "0 auto",
    boxSizing: "border-box",

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        padding: "3rem 0",
      },
    },
  }),
};
