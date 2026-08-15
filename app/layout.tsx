import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NSS IET DAVV - Volunteer Registration Form (Session 2026-27)",
  description: "Official National Service Scheme (NSS) Volunteer Registration Form for Institute of Engineering & Technology, DAVV Indore (Session 2026-27).",
  icons: {
    icon: [
      { url: '/NSS_logo_Fav.png?v=2', type: 'image/png' },
      { url: '/favicon.ico?v=2', type: 'image/x-icon' }
    ],
    shortcut: '/NSS_logo_Fav.png?v=2',
    apple: '/NSS_logo_Fav.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/NSS_logo_Fav.png?v=2" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/NSS_logo_Fav.png?v=2" />
        <link rel="apple-touch-icon" href="/NSS_logo_Fav.png?v=2" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#e6edf5] text-[#0B1B3D] selection:bg-[#0B1B3D] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
