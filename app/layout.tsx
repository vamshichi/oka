import type { Metadata } from "next";
import "./globals.css";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oakproject.in"), // Change to your domain

  title: {
    default: "The OAK Project",
    template: "%s | The OAK Project",
  },

  description:
    "One Heart. One Mission. One King. The OAK Project is a gospel instrumental band blending soul, gospel, indie, and contemporary worship music. Based in Bangalore, India.",

  keywords: [
    "The OAK Project",
    "Gospel Band",
    "Christian Band",
    "Instrumental Band",
    "Church Worship",
    "Worship Music",
    "Christian Music",
    "Live Worship",
    "Bangalore",
    "India",
  ],

  authors: [
    {
      name: "The OAK Project",
    },
  ],

  creator: "The OAK Project",

  publisher: "The OAK Project",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://oakproject.in",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/oaklogo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/oaklogo.png", sizes: "192x192", type: "image/png" },
      { url: "/images/oaklogo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/images/oaklogo.png",
        sizes: "180x180",
      },
    ],
    shortcut: "/images/oaklogo.png",
  },

  openGraph: {
  title: "The OAK Project",
  description:
    "One Heart. One Mission. One King. A Gospel Instrumental Band based in Bangalore.",
  url: "https://oakproject.in",
  siteName: "The OAK Project",
  images: [
    {
      url: "https://oakproject.in/og-image.png",
      width: 1200,
      height: 630,
      alt: "The OAK Project",
    },
  ],
},

twitter: {
  card: "summary_large_image",
  title: "The OAK Project",
  description:
    "One Heart. One Mission. One King.",
  images: ["https://oakproject.in/og-image.png"],
},

  category: "Music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Theme Color */}
        <meta name="theme-color" content="#0B0B0B" />

        {/* Mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta name="format-detection" content="telephone=no" />
      </head>

      <body
        className={`bg-ink text-off-white antialiased ${greatVibes.variable}`}
      >
        {children}
      </body>
    </html>
  );
}