import { globalStyle } from "@vanilla-extract/css";

import { colorVars } from "./contract.css";

globalStyle("body", {
  backgroundColor: colorVars.gray[2],
  fontFamily:
    '"Zen Kaku Gothic New", "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  margin: 0,
  padding: 0,
  color: colorVars.gray[12],

  minHeight: "100dvh",
  height: "100%",
});

globalStyle("html", {
  scrollPaddingTop: "50dvh",
  scrollBehavior: "smooth",
});

globalStyle("*", {
  margin: 0,
  fontSmooth: "always",
  WebkitFontSmoothing: "antialiased",
});
