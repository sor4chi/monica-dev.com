import { BREAKPOINT_MOBILE } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

const item = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.absolute[4],
  textDecoration: "none",
  borderRadius: vars.spacing.absolute[2],
  padding: `${vars.spacing.relative[2]} ${vars.spacing.relative[3]}`,
  transition: "background-color 0.2s ease-in-out",
  justifyContent: "space-between",
  position: "relative",

  ":focus-visible": {
    backgroundColor: vars.color.gray[3],
    outline: "none",
  },

  "@media": {
    "(hover: hover)": {
      ":hover": {
        backgroundColor: vars.color.gray[3],
      },
    },
  },
});

export const styles = {
  item,
  title: style({
    fontSize: vars.font.size.base,
    fontWeight: vars.font.weight.normal,
    color: vars.color.gray[12],
    width: "100%",
  }),
  arrow: style({
    width: "1rem",
    height: "1rem",
    flexShrink: 0,
    color: vars.color.gray[10],

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "none",
      },
    },
  }),
  domainDesktop: style({
    opacity: 0,
    color: vars.color.gray[10],
    fontSize: vars.font.size.sm,
    position: "absolute",
    top: "50%",
    left: vars.spacing.full,
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    gap: vars.spacing.absolute[2],
    padding: `${vars.spacing[0]} ${vars.spacing.absolute[4]}`,
    transition: "opacity 0.2s ease-in-out",
    pointerEvents: "none",

    selectors: {
      [`${item}:hover &`]: {
        opacity: 1,
      },
      [`${item}:focus-visible &`]: {
        opacity: 1,
      },
    },

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "none",
      },
    },
  }),
  domainMobile: style({
    display: "none",

    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "flex",
        alignItems: "center",
        gap: vars.spacing.absolute[2],
        color: vars.color.gray[10],
        fontSize: vars.font.size.sm,
        width: "1rem",
      },
    },
  }),
};
