import type {Metadata} from "next";
import {Inter, Roboto_Mono} from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cjet Dispatch Dashboard",
  description: "A sleek glassmorphic admin dashboard for Cjet Dispatch",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          ${robotoMono.variable}
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
