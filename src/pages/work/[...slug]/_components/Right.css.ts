import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const styles = {
  container: style({
    marginTop: vars.spacing.absolute[8],
  }),
};
