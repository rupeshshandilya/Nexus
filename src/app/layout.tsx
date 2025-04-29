import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { ClerkProvider } from "@clerk/nextjs";

// Import the fontsource packages
import "@fontsource/bebas-neue";
import "@fontsource/jetbrains-mono";

// Load local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Load Inter from Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXUS | Developer Resources",
  description:
    "Your one-stop destination for discovering high-quality libraries, packages, and resources",
  keywords: ["developer tools", "libraries", "packages", "resources", "nexus"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased bg-black text-white`}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
