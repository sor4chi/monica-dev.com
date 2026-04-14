import { slideIn } from "@sor4chi/design-system/animation.css";
import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";
import { BREAKPOINT_MOBILE } from "@/styles/constants";

export const styles = {
  container: style({
    width: "100%",
    maxWidth: "40rem",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    marginBottom: vars.spacing.absolute[8],
    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        paddingTop: vars.spacing.absolute[12],
      },
    },
  }),
  title: style({
    color: vars.color.gray[12],
    fontSize: vars.font.size.xl,
    fontWeight: vars.font.weight.bold,
    marginBottom: vars.spacing.absolute[4],
  }),
  description: style({
    color: vars.color.gray[11],
    marginBottom: vars.spacing.absolute[8],
  }),
  section: style({
    opacity: 0,
    animation: `${slideIn} 0.5s ease-in-out forwards`,
  }),
  listContainer: style({
    width: "100%",
    position: "relative",
  }),
  listTitle: style({
    position: "absolute",
    top: "50%",
    right: "100%",
    rotate: "-90deg",
    transform: "translateX(50%)",
    fontSize: vars.font.size.lg,
    color: vars.color.gray[9],
    fontWeight: 400,
    padding: `${vars.spacing.absolute[2]} 0`,
    marginBottom: vars.spacing.absolute[1],
    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        rotate: "0deg",
        top: "0",
        left: "50%",
        right: "auto",
        transform: `translate(-50%, calc(-1 * ${vars.spacing.absolute[8]} - ${vars.font.size.xl}))`,
        background: vars.color.gray[1],
        padding: vars.spacing.absolute[3],
        fontSize: vars.font.size.sm,
        margin: 0,
      },
    },
  }),
  hideOnSP: style({
    "@media": {
      [`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
        display: "none",
      },
    },
  }),
  list: style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.absolute[2],
    listStyle: "none",
    padding: 0,
  }),
  item: style({
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
  }),
  itemTitle: style({
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
  footer: style({
    marginTop: vars.spacing.absolute[8],
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  }),
  footerLink: style({
    fontSize: vars.font.size.sm,
  }),
};
