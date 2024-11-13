import * as styles from "./layout.css";

interface Props {
	children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
	return <div className={styles.container}>{children}</div>;
};
