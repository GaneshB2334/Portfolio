import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ganesh Bastapure | Software Engineer",
    template: "%s | Ganesh Bastapure",
  },
  description:
    "Portfolio of Ganesh Bastapure, a software engineer who has built a PDF editor, email campaign tools, realtime chat, document sharing, movie recommendations, dashboards, and product workflows.",
  keywords: [
    "Ganesh Bastapure",
    "Software Engineer",
    "Namaha PDF",
    "Email Campaign Hub",
    "ChimeChat",
    "Share The Doc",
    "Cine Match",
    "Portfolio",
  ],
  authors: [{ name: "Ganesh Bastapure", url: siteUrl }],
  creator: "Ganesh Bastapure",
  manifest: "/favicon_io/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico", sizes: "any" },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ganesh Bastapure | Software Engineer",
    description:
      "Portfolio of Ganesh Bastapure, featuring a PDF editor, email campaign tools, realtime chat, document sharing, movie recommendations, dashboards, and product workflows.",
    url: "/",
    siteName: "Ganesh Bastapure Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Bastapure | Software Engineer",
    description:
      "Portfolio of Ganesh Bastapure, featuring a PDF editor, email campaign tools, realtime chat, document sharing, movie recommendations, dashboards, and product workflows.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
