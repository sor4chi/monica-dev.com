import * as styles from "./list.css";

interface Props {
	children: React.ReactNode;
}

export const Ul = ({ children }: Props) => {
	return <ul className={styles.ul}>{children}</ul>;
};

export const Ol = ({ children }: Props) => {
	return <ol className={styles.ol}>{children}</ol>;
};

export const Li = ({ children }: Props) => {
	return <li className={styles.li}>{children}</li>;
};
