"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "react-feather";
import { clsx } from "../lib/clsx";
import * as styles from "./codeblock.css";

interface Props {
	children?: React.ReactNode;
}

export const CodeBlock = ({ children }: Props) => {
	const [isCopied, setIsCopied] = useState(false);
	const codeRef = useRef<HTMLDivElement>(null);

	const copyToClipboard = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			if (codeRef.current) {
				navigator.clipboard.writeText(codeRef.current.innerText);
				setIsCopied(true);
			}
		},
		[],
	);

	useEffect(() => {
		if (isCopied) {
			const timer = setTimeout(() => {
				setIsCopied(false);
			}, 500);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [isCopied]);

	return (
		<div className={clsx(styles.container, isCopied && styles.copied)}>
			<div ref={codeRef}>{children}</div>
			<button
				type="button"
				onClick={copyToClipboard}
				className={styles.copyButton}
			>
				<Check
					size={20}
					className={clsx(styles.copyButtonIcon, isCopied && styles.iconAppear)}
				/>
				<Copy
					size={20}
					className={clsx(styles.copyButtonIcon, !isCopied && styles.iconAppear)}
				/>
			</button>
		</div>
	);
};
