import { Article, SlideIn } from "@sor4chi/ui";

const PER_DELAY = 200;

interface SectionProps {
	idx: number;
	children: React.ReactNode;
}

export const Section = ({ children, idx }: SectionProps) => {
	return (
		<SlideIn delay={PER_DELAY * idx}>
			<Article as="div">{children}</Article>
		</SlideIn>
	);
};
