import * as styles from "./link.css";

interface LinkProps<T extends React.ElementType> {
	as?: T;
}

type Props<T extends React.ElementType> = LinkProps<T> &
	Omit<React.ComponentPropsWithoutRef<T>, keyof LinkProps<T>>;

export const Link = <T extends React.ElementType = "a">({
	as,
	...props
}: Props<T>) => {
	const LinkComponent = as || "a";

	const link = <LinkComponent {...props} className={styles.link} />;

	return link;
};
