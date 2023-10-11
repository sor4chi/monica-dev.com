import { LAYOUT_CONTAINER_SIDE_PADDING } from "@/styles/constants";
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
    width: `calc(80vw - ${LAYOUT_CONTAINER_SIDE_PADDING})`,
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.spacing.absolute[4],
    fontSize: vars.font.size.xl,
  }),
};

globalStyle(`${styles.backward}.is-active`, {
  zIndex: vars.zIndex.normal,
});
