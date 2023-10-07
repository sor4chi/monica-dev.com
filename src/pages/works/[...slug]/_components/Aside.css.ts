import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const ASIDE_WIDTH = "15rem";

export const styles = {
  aside: style({
    position: "sticky",
    top: vars.spacing.relative[4],
    height: "fit-content",
    width: ASIDE_WIDTH,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: vars.spacing.absolute[8],
  }),
};
