import { vars } from "@sor4chi/design-system/theme.css";
import { globalStyle, style } from "@vanilla-extract/css";

import {
	LAYOUT_CONTAINER_SIDE_PADDING,
	NAVIGATION_AREA_WIDTH,
} from "@/styles/constants";

export const styles = {
	backward: style({
		position: "fixed",
		top: 0,
		right: 0,
		bottom: 0,
		margin: "auto",
		zIndex: -1,
		padding: "1rem",
		boxSizing: "border-box",
		width: `calc(${NAVIGATION_AREA_WIDTH} - ${LAYOUT_CONTAINER_SIDE_PADDING})`,
		height: "90vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: vars.spacing.absolute[2],
		fontSize: vars.font.size.xl,
		visibility: "hidden",
	}),
	line: style({
		border: "none",
		height: "1px",
		width: "80%",
		backgroundColor: vars.color.gray[4],
		margin: `${vars.spacing.relative[4]} 0`,
	}),
	social: style({
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: vars.spacing.absolute[2],
	}),
	icon: style({
		flexShrink: 0,
		width: "1.5rem",
		height: "1.5rem",
	}),
	link: style({
		width: "100% !important",
		justifyContent: "center !important",
		maxWidth: "160px",
		position: "relative",
	}),
	active: style({
		color: vars.color.gray[11],
	}),
	activeDot: style({
		position: "absolute",
		top: "50%",
		left: vars.spacing.absolute[4],
		transform: "translateY(-50%)",
		width: "0.5rem",
		height: "0.5rem",
		borderRadius: "50%",
		backgroundColor: vars.color.gray[9],
	}),
};

globalStyle(`${styles.backward}.is-active`, {
	zIndex: vars.zIndex.normal,
});

globalStyle(`${styles.backward}.is-visibility-active`, {
	visibility: "visible",
});
