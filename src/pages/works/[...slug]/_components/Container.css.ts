import { style } from "@vanilla-extract/css";

import { CONTAINER_GAP, CONTENTS_MAX } from "./constants";

export const styles = {
  container: style({
    display: "flex",
    justifyContent: "center",
    gap: CONTAINER_GAP,
    width: "100%",
    maxWidth: CONTENTS_MAX,
    margin: "0 auto",
  }),
};
