import { CONTENTS_WITH_TOC } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

const ICON_SIZE = "3rem";
const DOT_SIZE = "0.5rem";

const row = style({});

export const styles = {
  row,
  col: style({
    verticalAlign: "top",
    paddingTop: vars.spacing[0],

    selectors: {
      [`${row} + ${row} &`]: {
        paddingTop: vars.spacing.absolute[4],
      },
    },
  }),
  iconCol: style({
    width: ICON_SIZE,
    paddingRight: vars.spacing.relative[4],
  }),
  icon: style({
    width: ICON_SIZE,
    height: ICON_SIZE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
    borderRadius: vars.spacing.full,
  }),
  dot: style({
    display: "block",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: vars.spacing.full,
    backgroundColor: vars.color.gray[8],
  }),
  item: style({
    width: "100%",
  }),
  dateCol: style({
    width: ICON_SIZE,
    textAlign: "right",
    paddingRight: vars.spacing.relative[4],

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        display: "none",
      },
    },
  }),
  titleWrapper: style({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: ICON_SIZE,
    gap: vars.spacing.relative[4],
  }),
  date: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
    whiteSpace: "nowrap",
    lineHeight: ICON_SIZE,
  }),
  desktopDate: style({
    display: "none",

    "@media": {
      [`screen and (min-width: ${CONTENTS_WITH_TOC})`]: {
        display: "block",
      },
    },
  }),
  mobileDate: style({
    display: "none",

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        display: "block",
      },
    },
  }),
  title: style({
    color: vars.color.gray[12],
    fontSize: vars.font.size.lg,
  }),
  description: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
  }),
};
