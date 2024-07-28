import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "design-system/theme.css";

export const styles = {
  container: style({
    width: "100%",
    display: "grid",
    gap: vars.spacing.absolute[4],
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",

    "@container": {
      "(max-width: 400px)": {
        gridTemplateColumns: "1fr",
      },
    },
  }),
  item: style({
    position: "relative",
    width: "100%",
    textDecoration: "none",
    borderRadius: vars.spacing.absolute[2],
    overflow: "hidden",

    "::before": {
      zIndex: vars.zIndex.normal,
      content: '""',
      position: "absolute",
      inset: 0,
    },
  }),
  thumbnail: style({
    width: "100%",
    display: "block",
    height: "auto",
    aspectRatio: "1200 / 630",
    objectFit: "cover",
    flexShrink: 0,
    transition: "filter 0.3s ease",
  }),
  content: style({
    zIndex: vars.zIndex.forward,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: vars.spacing.absolute[1],
    padding: vars.spacing.absolute[4],
    transform: "translateY(0)",
    transition: "transform 0.3s ease",
  }),
  event: style({
    fontSize: vars.font.size.sm,
    fontWeight: vars.font.weight.bold,
  }),
  title: style({
    fontSize: vars.font.size.lg,
    fontWeight: vars.font.weight.bold,
    transition: "color 0.3s ease",
  }),
};

globalStyle(`${styles.item}:hover ${styles.content}`, {
  transform: "translateY(-0.5rem)",
});

globalStyle(`.light ${styles.item}::before`, {
  background:
    "linear-gradient(to bottom, rgba(128, 128, 128, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)",
});

globalStyle(`.dark ${styles.item}::before`, {
  background:
    "linear-gradient(to bottom, rgba(128, 128, 128, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)",
});

globalStyle(`.light ${styles.title}`, {
  color: vars.color.gray[4],
});

globalStyle(`.light ${styles.event}`, {
  color: vars.color.gray[3],
});

globalStyle(`.dark ${styles.title}`, {
  color: vars.color.gray[11],
});

globalStyle(`.dark ${styles.event}`, {
  color: vars.color.gray[10],
});
