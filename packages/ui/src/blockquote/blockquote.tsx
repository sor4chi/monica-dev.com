import { Article } from "../article";
import * as styles from "./blockquote.css";

interface Props {
	children?: React.ReactNode;
}

export const Blockquote = ({ children }: Props) => {
	return (
		<blockquote className={styles.blockquote}>
			<Article as="div">{children}</Article>
		</blockquote>
	);
};
