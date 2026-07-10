'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type Dispatch, type SetStateAction } from 'react';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { href: '/', label: 'Game' },
  { href: '/rules', label: 'Rules' },
  { href: '/reference', label: 'Reference' },
] as const;

interface SidebarProps {
  collapsedState: [boolean, Dispatch<SetStateAction<boolean>>];
}

export default function Sidebar({ collapsedState }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = collapsedState;

  return (
    <>
      <button
        type="button"
        className={styles.mobileToggle}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span className={`${styles.bar} ${mobileOpen ? styles.barOpenTop : ''}`} />
        <span className={`${styles.bar} ${mobileOpen ? styles.barOpenMid : ''}`} />
        <span className={`${styles.bar} ${mobileOpen ? styles.barOpenBot : ''}`} />
      </button>

      <nav
        className={`${styles.sidebar} ${mobileOpen ? styles.open : ''} ${collapsed ? styles.collapsed : ''}`}
        aria-label="Primary navigation"
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{collapsed ? 'BQ' : 'Braille Quiz'}</h2>
          <button
            type="button"
            className={styles.collapseBtn}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((v) => !v)}
          >
            <span className={styles.minus} />
            <span className={`${styles.minus} ${styles.minusShort}`} />
          </button>
        </div>

        <ul className={styles.list}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                  title={item.label}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.text}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {mobileOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}