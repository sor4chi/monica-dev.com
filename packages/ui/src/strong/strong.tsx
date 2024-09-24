import * as styles from "./strong.css";

interface Props {
	children: React.ReactNode;
}

export const Strong = ({ children }: Props) => {
	return <strong className={styles.strong}>{children}</strong>;
};
