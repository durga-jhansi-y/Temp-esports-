import type { ReactNode } from 'react';
import NavBar from '../components/navBar';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.appShell}>
      <NavBar />

      <main className={styles.mainContent}>
        {children}
      </main>

      {/* Footer component can be added here when ready */}
      {/* Chatbot component can be added here when ready */}
    </div>
  );
}

export default MainLayout;