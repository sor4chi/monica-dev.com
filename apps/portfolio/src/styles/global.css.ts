import { globalStyle } from "@vanilla-extract/css";
import { vars } from "@sor4chi/design-system/theme.css";

globalStyle("body", {
  backgroundColor: vars.color.gray[2],
  fontFamily: '"Inter", "Noto Sans JP", sans-serif',
  fontSize: vars.font.size.base,
  margin: 0,
  padding: 0,
  color: vars.color.gray[11],

  minHeight: "100dvh",
  height: "100%",
});

if (process.env.NODE_ENV === "production") {
  globalStyle("html", {
    scrollBehavior: "smooth",
  });
}

globalStyle("html", {
  scrollPaddingTop: "30dvh",
});

globalStyle("*", {
  margin: 0,
  fontSmooth: "always",
  WebkitFontSmoothing: "antialiased",
});

globalStyle("::selection", {
  backgroundColor: vars.color.gray[5],
});
