import { vars } from "@sor4chi/design-system/theme.css";
import { globalStyle } from "@vanilla-extract/css";

globalStyle("body", {
	backgroundColor: vars.color.gray[2],
	fontFamily: '"Inter", "Noto Sans JP", sans-serif',
	fontSize: vars.font.size.base,
	margin: 0,
	padding: 0,
	color: vars.color.gray[12],
});

globalStyle("*", {
	margin: 0,
	fontSmooth: "always",
	WebkitFontSmoothing: "antialiased",
});
