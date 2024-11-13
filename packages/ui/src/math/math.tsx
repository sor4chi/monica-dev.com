"use client";
import "katex/dist/katex.min.css";
import Katex from "katex";
import React from "react";
import * as styles from "./math.css";

interface MathProps {
	content: string;
}

export const InlineMath = ({ content }: MathProps) => {
	const ref = React.useRef<HTMLSpanElement>(null);

	React.useEffect(() => {
		if (ref.current) {
			Katex.render(content, ref.current, {
				throwOnError: false,
			});
		}
	}, [content]);

	return <span ref={ref} className={styles.inlineMath} />;
};

export const BlockMath = ({ content }: MathProps) => {
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (ref.current) {
			Katex.render(content, ref.current, {
				throwOnError: false,
				displayMode: true,
			});
		}
	}, [content]);

	return <div ref={ref} className={styles.blockMath} />;
};
