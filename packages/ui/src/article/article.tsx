"use client";
import { createContext } from "react";
import * as styles from "./article.css";

interface Props {
	children: React.ReactNode;
	as?: "article" | "div";
}

export const ArticleContext = createContext<boolean>(false);

export const Article = ({ children, as: Wrapper = "article" }: Props) => {
	return (
		<ArticleContext.Provider value={true}>
			<Wrapper className={styles.article}>{children}</Wrapper>
		</ArticleContext.Provider>
	);
};
