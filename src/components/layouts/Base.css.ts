import { style } from "@vanilla-extract/css";

const TOP_PADDING = "10dvh";
const BOTTOM_PADDING = "1rem";
export const LAYOUT_CONTAINER_SIDE_PADDING = "1rem";

export const styles = {
  container: style({
    minHeight: `calc(100dvh - ${TOP_PADDING} - ${BOTTOM_PADDING})`,
    margin: "0 auto",
    padding: `${TOP_PADDING} ${LAYOUT_CONTAINER_SIDE_PADDING} ${BOTTOM_PADDING}`,
  }),
};
