import { vars } from "@sor4chi/design-system/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const inlineMath = style({
	padding: `0 ${vars.spacing.relative[1]}`,
});

export const blockMath = style({
	overflowX: "auto",
	overflowY: "hidden",
	width: "100%",
	margin: 0,
	scrollbarGutter: "stable",
});

globalStyle(`${blockMath} > .katex`, {
	padding: `${vars.spacing.relative[4]} ${vars.spacing.relative[8]}`,
	width: "fit-content",
	margin: "0 auto",
});
