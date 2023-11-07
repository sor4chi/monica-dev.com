import {
  LAYOUT_CONTAINER_SIDE_PADDING,
  NAVIGATION_AREA_WIDTH,
} from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const styles = {
  backward: style({
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    zIndex: -1,
    padding: "1rem",
    boxSizing: "border-box",
    width: `calc(${NAVIGATION_AREA_WIDTH} - ${LAYOUT_CONTAINER_SIDE_PADDING})`,
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.spacing.absolute[2],
    fontSize: vars.font.size.xl,
    visibility: "hidden",
  }),
  line: style({
    border: "none",
    height: "1px",
    width: "80%",
    backgroundColor: vars.color.gray[4],
    margin: `${vars.spacing.relative[4]} 0`,
  }),
  social: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.spacing.absolute[2],
  }),
  icon: style({
    flexShrink: 0,
    color: vars.color.gray[11],
    width: "1.5rem",
    height: "1.5rem",

    "@media": {
      "(hover: hover)": {
        ":hover": {
          color: vars.color.blue[9],
        },
      },
    },
  }),
};

globalStyle(`${styles.backward}.is-active`, {
  zIndex: vars.zIndex.normal,
});

globalStyle(`${styles.backward}.is-visibility-active`, {
  visibility: "visible",
});
