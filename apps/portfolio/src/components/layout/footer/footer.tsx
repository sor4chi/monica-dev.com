import * as styles from "./footer.css";

export const Footer = () => {
	const year = new Date().getFullYear();
	return <footer className={styles.footer}>&copy; {year} @sor4chi</footer>;
};
