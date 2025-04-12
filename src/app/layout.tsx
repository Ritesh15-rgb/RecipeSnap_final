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
      <header className="bg-secondary p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
              <Icons.logo className="h-6 w-6" />
              <span>RecipeSnap</span>
          </Link>
          <nav className="items-center space-x-6 text-sm font-medium">
              <Link href="/" className="hover:text-primary transition-colors">
                  Home
              </Link>
              <Link href="/camera" className="hover:text-primary transition-colors">
                  Camera
              </Link>
              <Link href="/ingredients" className="hover:text-primary transition-colors">
                  Ingredients
              </Link>
              <Link href="/recipes" className="hover:text-primary transition-colors">
                  Recipes
              </Link>
              <Link href="/settings" className="hover:text-primary transition-colors">
                  Settings
              </Link>
          </nav>
          <ModeToggle />
        </div>
      </header>
        {children}
      </body>
    </html>
  );
}
