import * as styles from "./heading.css";

type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
	as: Heading;
	children: React.ReactNode;
}

type Props = HeadingProps &
	Omit<React.ComponentPropsWithoutRef<Heading>, keyof HeadingProps>;

export const Heading = ({ as, children, ...props }: Props) => {
	const HeadingComponent = as;
	return (
		<HeadingComponent className={styles.heading[as]} {...props}>
			{children}
		</HeadingComponent>
	);
};
