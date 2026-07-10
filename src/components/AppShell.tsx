'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Sidebar from '@/components/Sidebar';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './AppShell.module.css';

function getInitialCollapsed(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('braille-sidebar-collapsed') === 'true';
}

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(getInitialCollapsed);

  return (
    <div className={styles.shell}>
      <ThemeProvider>
        <Sidebar collapsedState={[collapsed, setCollapsed]} />
        <ThemeToggle />
        <main className={`${styles.main} ${collapsed ? styles.mainCollapsed : ''}`}>
          {children}
        </main>
      </ThemeProvider>
    </div>
  );
}