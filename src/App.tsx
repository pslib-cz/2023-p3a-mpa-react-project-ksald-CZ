// src/App.tsx
import React from 'react';
import Board from './components/board';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Board />
    </div>
  );
};

export default App;
