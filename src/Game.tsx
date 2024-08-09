import React from 'react';
import { Link } from 'react-router-dom';
import Board from './components/board';

const Game: React.FC = () => {
  return (
    <div>
      <h1>Mahjong Game</h1>
      <Board />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Game;