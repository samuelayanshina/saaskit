import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'SaaSKit Dashboard',
  description: 'A sleek glassmorphic admin dashboard',
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
