import { slideIn } from "@sor4chi/design-system/animation.css";
import { style } from "@vanilla-extract/css";

export const slideInContainer = style({
	opacity: 0,
	animation: `${slideIn} 0.7s ease-in-out forwards`,
});
