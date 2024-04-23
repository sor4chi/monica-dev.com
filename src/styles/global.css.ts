import { globalStyle } from "@vanilla-extract/css";

import { colorVars } from "./contract.css";

globalStyle("body", {
  backgroundColor: colorVars.gray[2],
  fontFamily: '"Inter", "Noto Sans JP", sans-serif',
  margin: 0,
  padding: 0,
  color: colorVars.gray[11],

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
  backgroundColor: colorVars.gray[5],
});
