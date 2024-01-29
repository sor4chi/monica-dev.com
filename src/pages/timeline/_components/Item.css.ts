import { focusInteraction } from "@/styles/common.css";
import { CONTENTS_WITH_TOC } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

const ICON_SIZE = "3rem";
const DOT_SIZE = "0.5rem";
const LINE_WIDTH = "2px";

const row = style({});

export const styles = {
  row,
  col: style({
    verticalAlign: "top",
    paddingLeft: vars.spacing[0],
    paddingBottom: vars.spacing.absolute[4],
    paddingTop: vars.spacing[0],
  }),
  iconCol: style({
    width: ICON_SIZE,
    paddingRight: vars.spacing.relative[4],
    position: "relative",
  }),
  pointContainer: style({
    position: "relative",
    width: "3rem",
    height: "3rem",
  }),
  icon: style({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: vars.spacing.full,
  }),
  iconLink: style({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "block",
    borderRadius: vars.spacing.full,
    width: ICON_SIZE,
    height: ICON_SIZE,
    padding: vars.spacing.absolute[2],
    zIndex: 1,
    backgroundColor: vars.color.gray[1],

    ":focus-visible": {
      outline: `2px solid ${vars.color.blue[8]}`,
      outlineOffset: "-4px",
    },
  }),
  dot: style({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "block",
    padding: vars.spacing.absolute[2],
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: vars.spacing.full,
    backgroundColor: vars.color.gray[1],
    zIndex: 1,

    ":before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "block",
      width: DOT_SIZE,
      height: DOT_SIZE,
      borderRadius: vars.spacing.full,
      backgroundColor: vars.color.gray[8],
    },
  }),
  line: style({
    position: "absolute",
    top: `calc(${ICON_SIZE} / 2)`,
    left: `calc(${ICON_SIZE} / 2 - ${LINE_WIDTH} / 2)`,
    display: "block",
    width: LINE_WIDTH,
    height: "100%",
    backgroundColor: vars.color.gray[4],
    zIndex: 0,
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
    gap: vars.spacing.absolute[4],

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        flexDirection: "column",
        gap: vars.spacing[0],
        alignItems: "flex-start",
        height: "auto",
        marginBottom: vars.spacing.absolute[4],
      },
    },
  }),
  date: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
    whiteSpace: "nowrap",
    lineHeight: ICON_SIZE,

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        lineHeight: vars.font.size.base,
        marginTop: `calc(-1 * ${vars.spacing.absolute[1]})`,
      },
    },
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
    wordBreak: "auto-phrase" as any,

    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        lineHeight: vars.spacing.absolute[8],
        margin: `calc((${ICON_SIZE} - ${vars.spacing.absolute[8]}) / 2) 0`,
      },
    },
  }),
  description: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
  }),
};

globalStyle(`${styles.row}:last-child ${styles.line}`, {
  display: "none",
});
