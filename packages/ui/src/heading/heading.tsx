import * as styles from "./heading.css";

type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
	as: Heading;
	children: React.ReactNode;
} & React.ComponentProps<Heading>;

export const Heading = ({ as, children, ...props }: HeadingProps) => {
	const HeadingComponent = as;
	return (
		<HeadingComponent className={styles.heading[as]} {...props}>
			{children}
		</HeadingComponent>
	);
};
