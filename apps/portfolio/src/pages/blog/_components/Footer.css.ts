import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

export const styles = {
	footer: style({
		marginTop: vars.spacing.absolute[8],
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
	}),
	link: style({
		fontSize: vars.font.size.sm,
	}),
};
