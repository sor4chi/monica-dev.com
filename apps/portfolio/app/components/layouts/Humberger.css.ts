import { focusInteraction } from "@sor4chi/design-system/common.css";
import { vars } from "@sor4chi/design-system/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const styles = {
  button: style([
    focusInteraction,
    {
      position: "relative",
      width: "2.5rem",
      height: "2.5rem",
      border: "none",
      background: "transparent",
      borderRadius: vars.spacing.relative[2],
      boxSizing: "border-box",
      cursor: "pointer",
      overflow: "hidden",
      "@media": {
        "(hover: hover)": {
          ":hover": {
            backgroundColor: vars.color.gray[3],
          },
        },
      },
    },
  ]),
  lines: style({
    position: "absolute",
    margin: "auto",
    display: "block",
    width: "1.5rem",
    height: "0.125rem",
    backgroundColor: vars.color.gray[10],
    transform: "translateY(-50%)",
    left: 0,
    right: 0,
    borderRadius: vars.spacing.absolute[16],
    transition:
      "transform 0.2s ease-in-out, opacity 0.2s ease-in-out, left 0.2s ease-in-out",

    selectors: {
      "&:nth-child(1)": {
        top: "calc(50% - 0.5rem)",
        transformOrigin: "left top",
      },

      "&:nth-child(2)": {
        top: "50%",
        opacity: 1,
      },

      "&:nth-child(3)": {
        top: "calc(50% + 0.5rem)",
        transformOrigin: "left bottom",
      },
    },
  }),
};

globalStyle(`${styles.button}.is-active ${styles.lines}:nth-child(1)`, {
  transform: "translateY(-50%) rotate(45deg)",
  left: "0.5rem",
});

globalStyle(`${styles.button}.is-active ${styles.lines}:nth-child(2)`, {
  opacity: 0,
});

globalStyle(`${styles.button}.is-active ${styles.lines}:nth-child(3)`, {
  transform: "translateY(-50%) rotate(-45deg)",
  left: "0.5rem",
});
