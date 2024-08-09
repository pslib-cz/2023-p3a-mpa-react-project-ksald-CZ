// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h1>Mahjong Game</h1>
      <Link to="/game">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Play Game</button>
      </Link>
    </div>
  );
};

export default LandingPage;
