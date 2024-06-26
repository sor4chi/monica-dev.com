import { style } from "@vanilla-extract/css";
import { slideIn } from "design-system/animation.css";

export const styles = {
  section: style({
    opacity: 0,
    animation: `${slideIn} 0.5s ease-in-out forwards`,
  }),
};
