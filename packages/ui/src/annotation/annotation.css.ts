import { vars } from "@sor4chi/design-system/theme.css";
import { createVar, style, styleVariants } from "@vanilla-extract/css";

const annotationColorRGBVar = createVar();

export const annotation = style({
	padding: vars.spacing.absolute[4],
	borderRadius: vars.spacing.absolute[2],
	backgroundColor: `rgba(${annotationColorRGBVar}, 0.05)`,
	border: `1px solid rgba(${annotationColorRGBVar}, 0.125)`,
});

const COLORS = {
	WARNING: "246, 173, 85",
	NOTE: "99, 179, 237",
	IMPORTANT: "153, 102, 255",
	CAUTION: "252, 129, 129",
	TIP: "0, 204, 153",
};

export const annotationVariant = styleVariants({
	NOTE: {
		vars: {
			[annotationColorRGBVar]: COLORS.NOTE,
		},
	},
	WARNING: {
		vars: {
			[annotationColorRGBVar]: COLORS.WARNING,
		},
	},
	IMPORTANT: {
		vars: {
			[annotationColorRGBVar]: COLORS.IMPORTANT,
		},
	},
	CAUTION: {
		vars: {
			[annotationColorRGBVar]: COLORS.CAUTION,
		},
	},
	TIP: {
		vars: {
			[annotationColorRGBVar]: COLORS.TIP,
		},
	},
});

export const label = style({
	display: "block",
	color: `rgba(${annotationColorRGBVar}, 1)`,
	fontWeight: vars.font.weight.bold,
	marginBottom: vars.spacing.absolute[2],
});
