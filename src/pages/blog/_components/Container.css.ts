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
  }),
};
