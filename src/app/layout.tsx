import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MultiScribe - AI-Powered Audio & Video Transcription Service",
  description:
    "Transform audio and video into accurate text with MultiScribe's AI transcription technology. 99.8% accuracy, 100+ languages, and enterprise-grade security.",
  keywords: [
    "transcription",
    "AI transcription",
    "audio to text",
    "video to text",
    "speech recognition",
    "multilingual transcription",
  ],
  authors: [{ name: "MultiScribe Team" }],
  creator: "MultiScribe",
  publisher: "MultiScribe",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://multiscribe.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-us",
    },
  },
  openGraph: {
    title: "MultiScribe - AI-Powered Audio & Video Transcription",
    description:
      "Convert speech to text with 99.8% accuracy in 100+ languages. Perfect for content creators, journalists, researchers, and businesses.",
    url: "https://multiscribe.com",
    siteName: "MultiScribe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MultiScribe AI Transcription Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MultiScribe - AI-Powered Transcription",
    description:
      "Convert audio and video to text with cutting-edge AI technology",
    creator: "@multiscribe",
    images: ["/twitter-image.jpg"],
  },
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
