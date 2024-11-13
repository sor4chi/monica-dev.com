"use client";
import { createContext } from "react";
import * as styles from "./article.css";

interface Props {
	children: React.ReactNode;
}

export const ArticleContext = createContext<boolean>(false);

export const Article = ({ children }: Props) => {
	return (
		<ArticleContext.Provider value={true}>
			<article className={styles.article}>{children}</article>
		</ArticleContext.Provider>
	);
};
