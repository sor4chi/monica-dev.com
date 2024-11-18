import * as styles from "./slidein.css";

interface SlideInProps {
	children: React.ReactNode;
	delay?: number;
}

export const SlideIn = ({ children, delay = 0 }: SlideInProps) => {
	return (
		<div
			className={styles.slideInContainer}
			style={{
				animationDelay: `${delay}ms`,
			}}
		>
			{children}
		</div>
	);
};
