import { focusInteraction } from "@/styles/common.css";
import { CONTENTS_WITH_TOC } from "@/styles/constants";
import { vars } from "@/styles/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const styles = {
  links: style({
    display: "flex",
    alignItems: "center",
    gap: vars.spacing.relative[4],
  }),
  btn: style([
    focusInteraction,
    {
      display: "block",
      position: "relative",
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      backgroundColor: vars.color.gray[3],
      cursor: "pointer",
      color: vars.color.gray[11],
      border: "none",

      "@media": {
        "(hover: hover)": {
          ":hover": {
            color: vars.color.gray[12],
            backgroundColor: vars.color.gray[4],
          },
        },
      },
    },
  ]),
  onlyPC: style({
    "@media": {
      [`screen and (max-width: ${CONTENTS_WITH_TOC})`]: {
        display: "none",
      },
    },
  }),
  icon: style({
    width: "1rem",
    height: "1rem",
    position: "absolute",
    inset: "0",
    margin: "auto",
  }),
  copyIcon: style({}),
  checkIcon: style({}),
};

globalStyle(`.link-copy-button ${styles.checkIcon}`, {
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",
});

globalStyle(`.link-copy-button.copied ${styles.checkIcon}`, {
  opacity: 1,
  color: vars.color.gray[11],
});

globalStyle(`.link-copy-button ${styles.copyIcon}`, {
  opacity: 1,
  transition: "opacity 0.2s ease-in-out",
});

globalStyle(`.link-copy-button.copied ${styles.copyIcon}`, {
  opacity: 0,
});
