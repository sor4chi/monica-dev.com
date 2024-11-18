import * as styles from "./col-grid.css";

interface Props {
	children: React.ReactNode;
}

const ColGrid = ({ children }: Props) => {
	return <div className={styles.colGrid}>{children}</div>;
};

interface ColGridItemProps {
	children: React.ReactNode;
	start: number;
	end: number;
}

const ColGridItem = ({ children, start, end }: ColGridItemProps) => {
	return (
		<div
			className={styles.colGridItem}
			style={{
				gridColumnStart: start,
				gridColumnEnd: end,
			}}
		>
			{children}
		</div>
	);
};

export const Col = {
	Grid: ColGrid,
	Item: ColGridItem,
};
