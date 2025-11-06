import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SaaSKit Dashboard',
  description: 'A sleek glassmorphic admin dashboard',
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          min-h-screen antialiased
          bg-gray-50 text-gray-900 
          dark:bg-[#0E0E10] dark:text-gray-100
        `}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
