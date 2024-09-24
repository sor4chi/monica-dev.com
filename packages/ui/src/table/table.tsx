import * as styles from "./table.css";

interface Props {
	children: React.ReactNode;
}

export const Table = ({ children }: Props) => {
	return <table className={styles.table}>{children}</table>;
};

export const Th = ({ children }: Props) => {
	return <th className={styles.th}>{children}</th>;
};

export const Td = ({ children }: Props) => {
	return <td className={styles.td}>{children}</td>;
};

export const Tr = ({ children }: Props) => {
	return <tr className={styles.tr}>{children}</tr>;
};
