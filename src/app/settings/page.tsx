import SettingsPanel from '@/components/SettingsPanel';
import styles from './page.module.css';

export const metadata = {
  title: 'Settings — Braille Character Quiz',
};

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <SettingsPanel />
    </div>
  );
}
