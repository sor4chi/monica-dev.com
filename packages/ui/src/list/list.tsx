import * as styles from "./list.css";

interface Props {
	children: React.ReactNode;
	id?: string;
}

export const Ul = ({ children }: Props) => {
	return <ul className={styles.ul}>{children}</ul>;
};

export const Ol = ({ children, id }: Props) => {
	return (
		<ol className={styles.ol} id={id}>
			{children}
		</ol>
	);
};

export const Li = ({ children, id }: Props) => {
	return (
		<li className={styles.li} id={id}>
			{children}
		</li>
	);
};
