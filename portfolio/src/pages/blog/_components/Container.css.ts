import { BREAKPOINT_MOBILE } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

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
};
