import { style } from "@vanilla-extract/css";

import { BREAKPOINT_MOBILE } from "@/styles/constants";

export const styles = {
  container: style({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: "1rem auto",
    fontSize: "0.875rem",
    gap: "1rem",

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        flexDirection: "column",
      },
    },
  }),
  navPrev: style({
    width: "100%",
    textAlign: "left",
  }),
  navNext: style({
    width: "100%",
    textAlign: "right",
  }),
};
