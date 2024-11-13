import { Article } from "../article";
import { clsx } from "../lib/clsx";
import * as styles from "./annotation.css";

const ANNOTATION_LABELS = {
	WARNING: "Warning",
	IMPORTANT: "Important",
	NOTE: "Note",
	TIP: "Tip",
	CAUTION: "Caution",
} as const;

interface Props {
	children?: React.ReactNode;
	type: keyof typeof ANNOTATION_LABELS;
}

export const Annotation = ({ children, type }: Props) => {
	return (
		<div className={clsx(styles.annotation, styles.annotationVariant[type])}>
			<span className={styles.label}>{ANNOTATION_LABELS[type]}</span>
			<Article as="div">{children}</Article>
		</div>
	);
};
