import { vars } from "@sor4chi/design-system/theme.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const heading = styleVariants({
	h1: {
		fontSize: vars.font.size.relative.xl,
		fontWeight: vars.font.weight.bold,
		color: vars.color.gray[12],
		marginTop: vars.spacing.relative[10],
	},
	h2: {
		fontSize: vars.font.size.relative.lg,
		fontWeight: vars.font.weight.bold,
		color: vars.color.gray[12],
		marginTop: vars.spacing.relative[8],
	},
	h3: {
		fontSize: vars.font.size.relative.lg,
		fontWeight: vars.font.weight.bold,
		color: vars.color.gray[12],
		marginTop: vars.spacing.relative[6],
	},
	h4: {
		fontSize: vars.font.size.relative.base,
		fontWeight: vars.font.weight.bold,
		color: vars.color.gray[12],
		marginTop: vars.spacing.relative[4],
	},
	h5: {
		fontSize: vars.font.size.relative.base,
		fontWeight: vars.font.weight.bold,
		color: vars.color.gray[12],
		marginTop: vars.spacing.relative[4],
	},
	h6: {
		fontSize: vars.font.size.relative.base,
		fontWeight: vars.font.weight.bold,
		color: vars.color.gray[12],
		marginTop: vars.spacing.relative[4],
	},
});
