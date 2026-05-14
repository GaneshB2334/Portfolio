import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
