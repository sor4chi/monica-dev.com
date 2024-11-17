import * as styles from "./timeline.css";

interface TimelineItemProps {
	time: string;
	title: React.ReactNode;
	children: React.ReactNode;
}

const TimelineItem = ({ time, title, children }: TimelineItemProps) => {
	return (
		<div className={styles.timelineItem}>
			<h3 className={styles.timelineTitle}>
				<div className={styles.timelineTime}>{time}</div>
				{title}
			</h3>
			<div className={styles.timelineItem}>{children}</div>
		</div>
	);
};

interface TimelineProps {
	children: React.ReactNode;
}

const TimelineContainer = ({ children }: TimelineProps) => {
	return <div className={styles.timelineContainer}>{children}</div>;
};

export const Timeline = {
	Item: TimelineItem,
	Container: TimelineContainer,
};
