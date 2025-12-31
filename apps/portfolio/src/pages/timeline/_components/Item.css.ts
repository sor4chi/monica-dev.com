import { vars } from "@sor4chi/design-system/theme.css";
import { createVar, globalStyle, style } from "@vanilla-extract/css";

import { BREAKPOINT_MOBILE } from "@/styles/constants";

const iconSize = createVar();
const tableHGap = createVar();
const tableVGap = createVar();
const DOT_SIZE = "0.5rem";
const LINE_WIDTH = "2px";

export const styles = {
  row: style({
    vars: {
      [iconSize]: "3rem",
      [tableHGap]: vars.spacing.absolute[4],
      [tableVGap]: vars.spacing.absolute[6],
    },

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        vars: {
          [iconSize]: "2rem",
          [tableHGap]: vars.spacing.absolute[3],
        },
      },
    },
  }),
  col: style({
    verticalAlign: "top",
    paddingLeft: vars.spacing[0],
    paddingBottom: tableVGap,
    paddingTop: vars.spacing[0],
  }),
  iconCol: style({
    width: iconSize,
    paddingRight: tableHGap,
    position: "relative",
  }),
  pointContainer: style({
    position: "relative",
    width: iconSize,
    height: iconSize,
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
    width: iconSize,
    height: iconSize,
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
    top: `calc(${iconSize} / 2)`,
    left: `calc(${iconSize} / 2 - ${LINE_WIDTH} / 2)`,
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
    width: iconSize,
    textAlign: "right",
    paddingRight: vars.spacing.relative[4],

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "none",
      },
    },
  }),
  titleWrapper: style({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: iconSize,
    gap: vars.spacing.absolute[4],

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        flexDirection: "column",
        gap: vars.spacing[0],
        alignItems: "flex-start",
        height: "auto",
        marginBottom: vars.spacing.absolute[4],
      },
    },
  }),
  date: style({
    color: vars.color.gray[10],
    fontSize: vars.font.size.sm,
    whiteSpace: "nowrap",
    lineHeight: iconSize,

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        lineHeight: vars.font.size.base,
        marginTop: `calc(-1 * ${vars.spacing.absolute[1]})`,
      },
    },
  }),
  desktopDate: style({
    display: "none",

    "@media": {
      [`screen and (min-width: ${BREAKPOINT_MOBILE})`]: {
        display: "block",
      },
    },
  }),
  mobileDate: style({
    display: "none",

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "block",
      },
    },
  }),
  title: style({
    color: vars.color.gray[12],
    fontSize: vars.font.size.lg,
    fontWeight: vars.font.weight.bold,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    wordBreak: "auto-phrase",

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        lineHeight: 1,
        marginBottom: vars.spacing.absolute[2],
      },
    },
  }),
  description: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
  }),
  content: style({
    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        transform: `translateX(calc(-1 * (${iconSize} + ${tableHGap})))`,
        width: `calc(100% + ${iconSize} + ${tableHGap})`,
        backgroundColor: vars.color.gray[2],
        borderRadius: vars.spacing.absolute[2],
        border: `1px solid ${vars.color.gray[4]}`,
        padding: vars.spacing.absolute[4],
        boxSizing: "border-box",
        fontSize: vars.font.size.sm,
      },
    },
  }),
};

globalStyle(`${styles.row}:last-child ${styles.line}`, {
  display: "none",
});
