'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Sidebar from '@/components/Sidebar';
import ThemeToggle from '@/components/ThemeToggle';
import styles from './AppShell.module.css';

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('braille-sidebar-collapsed');
    if (stored === 'true') setCollapsed(true);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      'braille-sidebar-collapsed',
      collapsed ? 'true' : 'false',
    );
  }, [collapsed]);

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