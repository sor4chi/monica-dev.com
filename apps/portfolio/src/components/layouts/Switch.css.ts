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
			fill: "none",
			stroke: vars.color.gray[10],
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
	sun: style({
		position: "absolute",
		inset: 0,
		margin: "auto",
		display: "none",
	}),
	moon: style({
		position: "absolute",
		inset: 0,
		margin: "auto",
		display: "none",
	}),
};

globalStyle(`.light ${styles.sun}`, {
	display: "block",
});

globalStyle(`.dark ${styles.moon}`, {
	display: "block",
});
