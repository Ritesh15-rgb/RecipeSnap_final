import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Link from "next/link";
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RecipeSnap',
  description: 'Create recipes from photos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      
        {children}
      </body>
    </html>
  );
}

