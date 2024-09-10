import { vars } from "@sor4chi/design-system/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const styles = {
	wrapper: style({
		position: "relative",
	}),
	target: style({}),
	tooltip: style({
		position: "absolute",
		bottom: `calc(100% + ${vars.spacing.absolute[2]})`,
		left: "50%",
		transform: "translateX(-50%)",
		padding: `${vars.spacing.absolute[1]} ${vars.spacing.absolute[2]}`,
		borderRadius: "0.5rem",
		backgroundColor: vars.color.gray[2],
		border: `1px solid ${vars.color.gray[4]}`,
		color: vars.color.gray[11],
		fontSize: "0.75rem",
		fontWeight: vars.font.weight.medium,
		opacity: 0,
		transition: "opacity 0.2s",
		pointerEvents: "none",
		zIndex: vars.zIndex.forward,
		whiteSpace: "nowrap",
	}),
};

globalStyle(`${styles.target}:hover + ${styles.tooltip}`, {
	opacity: 1,
});

globalStyle(`${styles.target}:has(*:focus-visible) + ${styles.tooltip}`, {
	opacity: 1,
});

globalStyle(`${styles.target} *:focus-visible`, {
	outline: "none",
});
