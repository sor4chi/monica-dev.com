import '@/styles/global.css'

import { clsx } from 'clsx'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

import { styles } from '@/components/layouts/Base.css'
import Footer from '@/components/layouts/Footer'
import Navigation from '@/components/layouts/Navigation'
import {
  NavigationProvider,
  useNavigation,
} from '@/components/layouts/NavigationContext'
import RightTopArea from '@/components/layouts/RightTopArea'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="light">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="sitemap" href="/sitemap-index.xml" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+JP:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var theme = localStorage.getItem("theme");
                if (!theme) {
                  theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                }
                document.documentElement.classList.add(theme);
                document.documentElement.classList.remove(theme === "dark" ? "light" : "dark");
              })();
            `,
          }}
        />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

function RootContent() {
  const { isOpen } = useNavigation()

  return (
    <>
      <RightTopArea />
      <main className={clsx(styles.container, isOpen && 'is-active')}>
        <Outlet />
        <Footer />
      </main>
      <Navigation />
    </>
  )
}

export default function Root() {
  return (
    <NavigationProvider>
      <RootContent />
    </NavigationProvider>
  )
}
