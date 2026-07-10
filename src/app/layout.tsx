import type { Metadata, Viewport } from 'next';
import './globals.css';
import AppShell from '@/components/AppShell';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'Braille Character Quiz',
  description:
    'Interactive web game for learning and practicing Braille characters — lowercase letters, capital letters, and numbers.',
  icons: { icon: (process.env.NODE_ENV ?? 'development') === 'production' ? '/braille-quiz-game/favicon.svg' : '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0e12' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" data-accent="purple" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body>
        <TooltipProvider>
          <AppShell>{children}</AppShell>
        </TooltipProvider>
      </body>
    </html>
  );
}