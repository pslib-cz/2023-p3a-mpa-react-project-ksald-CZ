
import React, { useState } from 'react';
import Board from './components/board';
import { generateTiles, Tile } from './components/tile';

const Game: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>(generateTiles());

  return (
    <div className="game">
      <h1>Mahjong Solitaire</h1>
      <Board tiles={tiles} />
      {/* Add additional game UI components */}
    </div>
  );
};

export default Game;
