import React from 'react';
import GameScreen from './components/GameScreen';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <GameScreen />
    </div>
  );
};

export default App;