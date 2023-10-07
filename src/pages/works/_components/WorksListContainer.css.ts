import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const styles = {
  container: style({
    width: "100%",
    maxWidth: "40rem",
    margin: `${vars.spacing.relative[8]} auto`,
  }),
  title: style({
    borderBottom: `1px solid ${vars.color.gray[6]}`,
    fontSize: vars.font.size.xl,
    fontWeight: 400,
    padding: `${vars.spacing.relative[2]} 0`,
    marginBottom: vars.spacing.relative[4],
  }),
  listContainer: style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.absolute[8],
    listStyle: "none",
    padding: 0,
  }),
};
