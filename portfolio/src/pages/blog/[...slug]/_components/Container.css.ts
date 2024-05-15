import { style } from "@vanilla-extract/css";

import { CONTAINER_GAP, BREAKPOINT_TABLET } from "../../../../styles/constants";

export const styles = {
  container: style({
    display: "flex",
    justifyContent: "center",
    gap: CONTAINER_GAP,
    width: "100%",
    maxWidth: BREAKPOINT_TABLET,
    margin: "0 auto 3rem",
  }),
};
