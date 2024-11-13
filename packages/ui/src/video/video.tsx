import * as styles from "./video.css";

interface Props {
	src: string;
}

export const Video = ({ src }: Props) => {
	return (
		<video className={styles.video} src={src} autoPlay playsInline loop muted />
	);
};
