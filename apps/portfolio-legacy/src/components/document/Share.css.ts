import { focusInteraction } from "@sor4chi/design-system/common.css";
import { vars } from "@sor4chi/design-system/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const styles = {
	links: style({
		display: "flex",
		gap: vars.spacing.absolute[6],
		flexDirection: "column",
		justifyContent: "center",
	}),
	flex: style({
		flexDirection: "row",
		gap: vars.spacing.absolute[2],
		width: "100%",
	}),
	btnWrapper: style([
		focusInteraction,
		{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column",
			width: vars.spacing.absolute[16],
		},
	]),
	btn: style([
		focusInteraction,
		{
			display: "block",
			position: "relative",
			width: vars.spacing.absolute[10],
			height: vars.spacing.absolute[10],
			borderRadius: "50%",
			cursor: "pointer",
			color: vars.color.gray[10],
			border: "none",
			background: "none",
			boxSizing: "border-box",

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
	btnDescription: style({
		fontSize: "0.75rem",
		marginTop: vars.spacing.relative[1],
		textAlign: "center",
		color: vars.color.gray[9],
	}),
	icon: style({
		width: vars.font.size.xl,
		height: vars.font.size.xl,
		position: "absolute",
		inset: "0",
		margin: "auto",
	}),
	copyIcon: style({}),
	checkIcon: style({
		color: vars.color.gray[12],
	}),
};

globalStyle(`.link-copy-button ${styles.checkIcon}`, {
	opacity: 0,
	transition: "opacity 0.2s ease-in-out",
});

globalStyle(`.link-copy-button.copied ${styles.checkIcon}`, {
	opacity: 1,
	color: vars.color.gray[10],
});

globalStyle(`.link-copy-button ${styles.copyIcon}`, {
	opacity: 1,
	transition: "opacity 0.2s ease-in-out",
});

globalStyle(`.link-copy-button.copied ${styles.copyIcon}`, {
	opacity: 0,
});

globalStyle(`${styles.flex} ${styles.btnWrapper}`, {
	gap: vars.spacing[0],
});
