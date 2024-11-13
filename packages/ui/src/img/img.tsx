import * as styles from "./img.css";

interface Props {
	src: string;
	alt?: string;
}

export const Img = ({ src, alt }: Props) => {
	return <img className={styles.img} src={src} alt={alt} />;
};
