import { useCallback, useContext, useEffect, useState } from "react";
import { ArticleContext } from "../article";
import { Link } from "../link";
import * as styles from "./link-card.css";

interface LinkMeta {
	imageUrl: string;
	title: string;
	faviconUrl: string;
}

type LinkMetaFetcher = (url: string) => Promise<LinkMeta | null>;

interface LinkCardProps<T extends React.ElementType> {
	as?: T;
	linkMetaFetcher: LinkMetaFetcher;
}

type Props<T extends React.ElementType> = LinkCardProps<T> &
	Omit<React.ComponentPropsWithoutRef<T>, keyof LinkCardProps<T>>;

type FetchState =
	| {
			status: "loading";
	  }
	| {
			status: "success";
			val: LinkMeta;
	  }
	| {
			status: "error";
	  };

export const LinkCard = <T extends React.ElementType = "a">({
	as,
	linkMetaFetcher,
	...props
}: Props<T>) => {
	const articleContext = useContext(ArticleContext);
	if (!articleContext) {
		throw new Error("LinkCard must be used inside an Article");
	}

	const isInternalLink = props.href?.startsWith("/");

	const [linkInfo, setLinkInfo] = useState<FetchState>({ status: "loading" });

	const fetchLinkInfo = useCallback(async () => {
		if (!props.href) {
			return;
		}

		try {
			const linkMeta = await linkMetaFetcher(props.href);
			if (linkMeta) {
				setLinkInfo({ status: "success", val: linkMeta });
			} else {
				setLinkInfo({ status: "error" });
			}
		} catch {
			setLinkInfo({ status: "error" });
		}
	}, [props.href, linkMetaFetcher]);

	useEffect(() => {
		fetchLinkInfo();
	}, [fetchLinkInfo]);

	const LinkableComponent = as || "a";

	if (linkInfo.status === "error") {
		return (
			// @ts-ignore TODO: Fix this
			<Link as={as} {...props} className={styles.linkCard}>
				{props.children || props.href}
			</Link>
		);
	}

	return (
		<LinkableComponent
			{...props}
			target={isInternalLink ? "_blank" : undefined}
			rel={isInternalLink ? "noreferrer noopener" : undefined}
			className={styles.linkCard}
		>
			{linkInfo.status === "loading" && (
				<>
					<div className={styles.linkCardImagePlaceholder} />
					<div className={styles.linkCardContent}>Loading...</div>
				</>
			)}
			{linkInfo.status === "success" && (
				<>
					{linkInfo.val.imageUrl && (
						<img
							className={styles.linkCardImage}
							src={linkInfo.val.imageUrl}
							alt={linkInfo.val.title}
						/>
					)}
					<div className={styles.linkCardContent}>
						<span className={styles.linkCardTitle}>{linkInfo.val.title}</span>
						<div className={styles.linkCardMeta}>
							{linkInfo.val.faviconUrl && (
								<span
									className={styles.linkCardFavicon}
									style={{ backgroundImage: `url(${linkInfo.val.faviconUrl})` }}
								/>
							)}
							<div className={styles.linkCardDomain}>
								{new URL(props.href).hostname}
							</div>
						</div>
					</div>
				</>
			)}
		</LinkableComponent>
	);
};
