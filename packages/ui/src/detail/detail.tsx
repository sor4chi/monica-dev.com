import { Article } from "../article";
import * as styles from "./detail.css";

interface Props {
	summary: React.ReactNode;
	children: React.ReactNode;
}

export const Detail = ({ summary, children }: Props) => {
	return (
		<details className={styles.details}>
			<summary className={styles.summary}>{summary}</summary>
			<div className={styles.content}>
				<Article as="div">{children}</Article>
			</div>
		</details>
	);
};
