import * as styles from "./paragraph.css";

interface Props {
	children: React.ReactNode;
}

export const Paragraph = ({ children }: Props) => {
	return <p className={styles.paragraph}>{children}</p>;
};
