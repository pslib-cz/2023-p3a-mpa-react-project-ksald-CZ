// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './landignPage';
import Game from './Game';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/2023-p3a-mpa-react-project-ksald-CZ" element={<LandingPage />} />
          <Route path="/2023-p3a-mpa-react-project-ksald-CZ/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
