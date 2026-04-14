import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";
import { ARTICLE_WIDTH, ASIDE_WIDTH, BREAKPOINT_MOBILE, BREAKPOINT_TABLET, CONTAINER_GAP } from "@/styles/constants";

export const styles = {
  container: style({
    display: "flex",
    justifyContent: "center",
    gap: CONTAINER_GAP,
    width: "100%",
    maxWidth: BREAKPOINT_TABLET,
    margin: "0 auto 3rem",
  }),
  aside: style({
    position: "sticky",
    top: `calc(${vars.spacing.absolute[8]} + 0.25rem)`,
    height: "fit-content",
    width: ASIDE_WIDTH,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
  }),
  leftAside: style({
    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "none",
      },
    },
  }),
  rightAside: style({
    "@media": {
      [`screen and (max-width: ${BREAKPOINT_TABLET})`]: {
        display: "none",
      },
    },
  }),
  article: style({
    position: "relative",
    width: "100%",
    maxWidth: ARTICLE_WIDTH,
  }),
  backLink: style({
    display: "none",
    height: "2.5rem",
    marginBottom: vars.spacing.absolute[2],
    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "inline-flex",
        alignItems: "center",
      },
    },
  }),
  leftContainer: style({
    marginTop: vars.spacing.absolute[4],
  }),
  notPC: style({
    display: "none",
    "@media": {
      [`screen and (max-width: ${BREAKPOINT_TABLET})`]: {
        display: "contents",
      },
    },
  }),
  rightContainer: style({
    marginTop: vars.spacing.absolute[8],
  }),
  onlySP: style({
    marginTop: vars.spacing.absolute[6],
    display: "none",
    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "block",
      },
    },
  }),
};
