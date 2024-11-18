import { Github, X } from "@/components/icon";
import Link from "next/link";
import * as styles from "./profile-card.css";

interface ProfileCardProps {
	github: string;
	x: string;
	title: string;
	subtitle: string;
}

export const ProfileCard = ({
	github,
	x,
	title,
	subtitle,
}: ProfileCardProps) => {
	return (
		<div className={styles.container}>
			<img
				src="/assets/icon.webp"
				width="64"
				height="64"
				alt="Profile"
				className={styles.avatar}
			/>
			<div className={styles.texts}>
				<h1 className={styles.title}>{title}</h1>
				<span className={styles.subtitle}>{subtitle}</span>
			</div>
			<div className={styles.socials}>
				<Link
					href={github}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.socialLink}
					aria-label="Github Link"
				>
					<Github />
				</Link>
				<Link
					href={x}
					target="_blank"
					rel="noopener noreferrer"
					className={styles.socialLink}
					aria-label="X Link"
				>
					<X size={20} />
				</Link>
			</div>
		</div>
	);
};
