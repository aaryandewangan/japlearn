import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from '@/app/providers/AuthProvider';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JapLearn - Learn Japanese the Smart Way",
  description: "Interactive Japanese learning platform",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AnimatePresence mode="wait">
          <AuthProvider>
            <ThemeProvider>
              {children}
              <Toaster position="top-right" />
            </ThemeProvider>
          </AuthProvider>
        </AnimatePresence>
      </body>
    </html>
  );
}
