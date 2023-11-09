import { vars } from "@/styles/theme.css";
import { style } from "@vanilla-extract/css";

export const styles = {
  container: style({
    width: "100%",
  }),
  title: style({
    borderBottom: `1px solid ${vars.color.gray[6]}`,
    fontSize: vars.font.size.base,
    fontWeight: 400,
    padding: `${vars.spacing.relative[2]} 0`,
    marginBottom: vars.spacing.relative[4],
  }),
  listContainer: style({
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.absolute[2],
    listStyle: "none",
    padding: 0,
  }),
};
