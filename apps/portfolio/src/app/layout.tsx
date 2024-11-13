import type { Metadata } from "next";
import "@sor4chi/design-system/global.css";

export const metadata: Metadata = {
	title: "Portfolio Neo",
	description: "monica-dev.com reimplementation using Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body>{children}</body>
		</html>
	);
}
