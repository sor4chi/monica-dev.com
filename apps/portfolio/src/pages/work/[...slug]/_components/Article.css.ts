import { style } from "@vanilla-extract/css";
import { vars } from "@sor4chi/design-system/theme.css";

import { ARTICLE_WIDTH, BREAKPOINT_MOBILE } from "@/styles/constants";

export const styles = {
  article: style({
    position: "relative",
    width: "100%",
    maxWidth: ARTICLE_WIDTH,
  }),
  heroImage: style({
    width: vars.spacing.full,
    height: "auto",
    aspectRatio: "1200 / 630",
    objectFit: "cover",
    borderRadius: vars.spacing.absolute[2],
    marginBottom: vars.spacing.absolute[8],
    border: `1px solid ${vars.color.gray[3]}`,
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
};
