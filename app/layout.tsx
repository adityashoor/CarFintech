import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { ThemeProvider } from "next-themes";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/navigation/Navbar";
import { MobileCta } from "@/components/navigation/MobileCta";
import { ScrollToTop } from "@/components/navigation/ScrollToTop";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { Footer } from "@/components/footer/Footer";
import { SiteJsonLd } from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.tagline} - ${site.name}`, template: `%s - ${site.name}` },
  description: "At Car Fintech, we're a team of Asset Finance Brokers helping clients Australia-wide with their lending needs",
  applicationName: site.name,
  openGraph: { type: "website", locale: "en_AU", siteName: site.name },
  twitter: { card: "summary_large_image" },
  robots: site.noindex ? { index: false, follow: false, nocache: true } : { index: true, follow: true },
  other: process.env.NEXT_PUBLIC_DEMO === "1" ? { copyright: `Design and code © ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_DEMO_OWNER || "Aditya Shoor"}. Evaluation only; not for reproduction.` } : {},
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#0b1014" }], colorScheme: "light dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en-AU" suppressHydrationWarning className={`${jakarta.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileCta />
          <ScrollToTop />
        </MotionProvider>
        </ThemeProvider>
        <SiteJsonLd />
        {ga && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
