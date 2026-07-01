import type { Metadata } from "next";
// @ts-ignore
import "./globals.css";
import { Great_Vibes } from "next/font/google";

export const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "The OAK Project — A Gospel Instrumental Band",
  description:
    "One Heart. One Mission. One King. The OAK Project is a gospel instrumental band blending soul, gospel, indie, and contemporary music. Based in Bangalore, India.",
  keywords: ["gospel band", "instrumental", "OAK Project", "Bangalore", "Christian music"],
  openGraph: {
    title: "The OAK Project",
    description: "One Heart. One Mission. One King.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`bg-ink text-off-white antialiased ${greatVibes.variable}`}>{children}</body>
    </html>
  );
}
