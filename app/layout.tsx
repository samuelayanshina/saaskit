import type {Metadata} from "next";
import {Inter, JetBrains_Mono} from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cjet Dispatch Dashboard",
  description: "A sleek glassmorphic admin dashboard",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          ${jetBrainsMono.variable}
          min-h-screen antialiased
          bg-gray-50 text-gray-900
          dark:bg-[#0E0E10] dark:text-gray-100
          overflow-x-hidden
        `}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
