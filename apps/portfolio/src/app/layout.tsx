import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "@sor4chi/design-system/global.css";
import { Footer } from "@/components/layout/footer";
import { clsx } from "@sor4chi/ui";

export const metadata: Metadata = {
	title: "Portfolio Neo",
	description: "monica-dev.com reimplementation using Next.js",
};

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
});
const inter = Inter({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<head>
				<script src="/scripts/theme.js" />
			</head>
			<body className={clsx(notoSansJP.className, inter.className)}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
