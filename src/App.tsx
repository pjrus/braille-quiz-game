import React, { useState, useEffect } from 'react';
import GameScreen from './components/GameScreen';
import Rules from './components/Rules';
import BrailleReference from './components/BrailleReference';
import './App.css';

type AppPage = 'game' | 'rules' | 'reference';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>('game');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  type Accent = 'purple' | 'teal' | 'emerald' | 'amber' | 'rose' | 'blue';
  const [accent, setAccent] = useState<Accent>('purple');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('braille-game-theme');
    const savedAccentRaw = localStorage.getItem('braille-game-accent') || 'purple';
    const validAccents: Accent[] = ['purple', 'teal', 'emerald', 'amber', 'rose', 'blue'];
    const savedAccent: Accent = validAccents.includes(savedAccentRaw as Accent)
      ? (savedAccentRaw as Accent)
      : 'purple';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldUseDark);
  setAccent(savedAccent);
    document.documentElement.setAttribute('data-theme', shouldUseDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-accent', savedAccent);
    document.body.style.background = 'var(--bg-primary)';
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('braille-game-theme', newTheme ? 'dark' : 'light');
  };

  const cycleAccent = () => {
    const palettes: Accent[] = ['purple', 'teal', 'emerald', 'amber', 'rose', 'blue'];
    const idx = palettes.indexOf(accent);
    const next = palettes[(idx + 1) % palettes.length];
    setAccent(next);
    document.documentElement.setAttribute('data-accent', next);
    localStorage.setItem('braille-game-accent', next);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'rules':
        return <Rules />;
      case 'reference':
        return <BrailleReference />;
      default:
        return <GameScreen />;
    }
  };

  return (
    <div className="app">
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
      </button>

      {/* Theme toggle */}
      <button 
        className="app-accent-toggle"
        onClick={cycleAccent}
        aria-label="Change accent color"
        title={`Accent: ${accent}`}
      >
        <span className="accent-swatch" />
      </button>

      <button 
        className="app-theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDarkMode ? 'L' : 'D'}
      </button>

      {/* Sidebar */}
      <nav className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2>{sidebarCollapsed ? 'BQ' : 'Braille Quiz'}</h2>
          <button 
            className="sidebar-collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        <ul className="sidebar-nav">
          <li>
            <button
              className={`nav-item ${currentPage === 'game' ? 'nav-item-active' : ''}`}
              onClick={() => {
                setCurrentPage('game');
                setSidebarOpen(false);
              }}
              title="Game"
            >
              <span className="nav-icon">G</span>
              {!sidebarCollapsed && <span className="nav-text">Game</span>}
            </button>
          </li>
          
          <li>
            <button
              className={`nav-item ${currentPage === 'rules' ? 'nav-item-active' : ''}`}
              onClick={() => {
                setCurrentPage('rules');
                setSidebarOpen(false);
              }}
              title="Rules"
            >
              <span className="nav-icon">R</span>
              {!sidebarCollapsed && <span className="nav-text">Rules</span>}
            </button>
          </li>
          
          <li>
            <button
              className={`nav-item ${currentPage === 'reference' ? 'nav-item-active' : ''}`}
              onClick={() => {
                setCurrentPage('reference');
                setSidebarOpen(false);
              }}
              title="Reference"
            >
              <span className="nav-icon">B</span>
              {!sidebarCollapsed && <span className="nav-text">Reference</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className={`main-content ${sidebarCollapsed ? 'main-content-collapsed' : ''}`}>
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default App;