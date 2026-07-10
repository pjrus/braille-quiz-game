'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import AppSidebar from '@/components/Sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import styles from './AppShell.module.css';

const SIDEBAR_WIDTH_KEY = 'braille-sidebar-width';
const SIDEBAR_MIN_WIDTH = 140;
const SIDEBAR_MAX_WIDTH = 420;
const SIDEBAR_DEFAULT_WIDTH = 256;

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // Matches the server-rendered default; the real value is read from
  // localStorage after mount to avoid a hydration mismatch.
  const [width, setWidth] = useState(SIDEBAR_DEFAULT_WIDTH);

  useEffect(() => {
    const saved = Number(window.localStorage.getItem(SIDEBAR_WIDTH_KEY));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setWidth(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_WIDTH_KEY, String(width));
  }, [width]);

  return (
    <ThemeProvider>
      <SidebarProvider style={{ '--sidebar-width': `${width}px` } as React.CSSProperties}>
        <AppSidebar
          width={width}
          onWidthChange={setWidth}
          minWidth={SIDEBAR_MIN_WIDTH}
          maxWidth={SIDEBAR_MAX_WIDTH}
        />
        <SidebarInset>
          <SidebarTrigger className={styles.mobileTrigger} />
          <div className={styles.main}>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
