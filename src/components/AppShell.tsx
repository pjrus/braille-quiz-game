import { ThemeProvider } from '@/components/ThemeProvider';
import AppSidebar from '@/components/Sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import styles from './AppShell.module.css';

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarTrigger className={styles.mobileTrigger} />
          <div className={styles.main}>{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
