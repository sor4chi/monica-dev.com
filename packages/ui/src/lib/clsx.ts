export const clsx = (
	...classes: (string | undefined | null | false)[]
): string => {
	return classes.filter(Boolean).join(" ");
};
