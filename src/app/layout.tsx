import type { Metadata, Viewport } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dhruv Saxena | AI Engineer & Full Stack Developer",
    template: "%s | Dhruv Saxena",
  },
  metadataBase: new URL("https://dhruvsaxena.dev"),
  description: "AI Developer and Full Stack Engineer building intelligent systems. Computer Science student at PIET Jaipur. AI/ML Intern at HG Technologies.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Dhruv Saxena" }],
  creator: "Dhruv Saxena",
  publisher: "Dhruv Saxena",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dhruvsaxena.dev",
    siteName: "Dhruv Saxena | Portfolio",
    title: "Dhruv Saxena | AI Engineer & Full Stack Developer",
    description: "Building intelligent systems that scale. AI Engineer at HG Technologies.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dhruv Saxena - AI Engineer & Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Saxena | AI Engineer & Full Stack Developer",
    description: "Building intelligent systems that scale. AI Engineer at HG Technologies.",
    images: ["/og-image.jpg"],
    creator: "@dhruvsaxena",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: "#030307",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}