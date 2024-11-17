import * as styles from "./inlinecode.css";

interface InlineCodeProps {
	children: React.ReactNode;
}

export const InlineCode = ({ children }: InlineCodeProps) => {
	return <code className={styles.inlinecode}>{children}</code>;
};
