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
	const container = useRef<HTMLDivElement>(null);

	const copyToClipboard = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			if (container.current) {
				const pre = container.current.querySelector("pre");
				if (!pre) return;
				navigator.clipboard.writeText(pre.innerText);
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
		<div
			className={clsx(styles.container, isCopied && styles.copied)}
			ref={container}
		>
			{children}
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
					className={clsx(
						styles.copyButtonIcon,
						!isCopied && styles.iconAppear,
					)}
				/>
			</button>
		</div>
	);
};
