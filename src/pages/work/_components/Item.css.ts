import { focusInteraction } from "@/styles/common.css";
import { CONTENTS_WITH_TOC } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const styles = {
  item: style([
    focusInteraction,
    {
      display: "flex",
      alignItems: "center",
      gap: vars.spacing.relative[4],
      textDecoration: "none",
      borderRadius: vars.spacing.absolute[2],
    },
  ]),
  thumbnail: style({
    width: "10rem",
    height: "auto",
    aspectRatio: "1200 / 630",
    objectFit: "cover",
    borderRadius: vars.spacing.absolute[2],
    flexShrink: 0,

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        width: "8rem",
      },
    },
  }),
  content: style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.relative[2],
  }),
  title: style({
    color: vars.color.gray[12],
    transition: "color 0.2s ease-in-out",
    fontSize: vars.font.size.lg,
  }),
  description: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }),
};

globalStyle(`${styles.item}:hover ${styles.title}`, {
  "@media": {
    "(hover: hover)": {
      color: vars.color.gray[11],
    },
  },
});
