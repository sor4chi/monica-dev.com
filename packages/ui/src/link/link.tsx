import * as styles from "./link.css";

type Props<T extends React.ElementType> = {
	as: T;
	children: React.ReactNode;
	newTab?: boolean;
} & React.ComponentProps<T>;

export const Link = <T extends React.ElementType>({
	as: LinkableComponent,
	children,
	...props
}: Props<T>) => {
	return (
		<LinkableComponent
			{...props}
			target={props.newTab ? "_blank" : undefined}
			rel={props.newTab ? "noreferrer noopener" : undefined}
			className={styles.link}
		>
			{children}
		</LinkableComponent>
	);
};
