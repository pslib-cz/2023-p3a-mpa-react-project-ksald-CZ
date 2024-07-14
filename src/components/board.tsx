// src/Board.tsx
import React, { useContext, useEffect } from 'react';
import { GameContext, Tile as TileType } from '../GameContext';
import Tile from './tile';

import { initializeTiles } from './utils';

const positions = [
  { x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 2, y: 0, z: 0 },
  { x: 3, y: 0, z: 0 }, { x: 4, y: 0, z: 0 }, { x: 5, y: 0, z: 0 },
  { x: 6, y: 0, z: 0 }, { x: 7, y: 0, z: 0 }, { x: 8, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 }, { x: 1, y: 1, z: 0 }, { x: 2, y: 1, z: 0 },
  { x: 3, y: 1, z: 0 }, { x: 4, y: 1, z: 0 }, { x: 5, y: 1, z: 0 },
  { x: 6, y: 1, z: 0 }, { x: 7, y: 1, z: 0 }, { x: 8, y: 1, z: 0 },
  { x: 0, y: 2, z: 0 }, { x: 1, y: 2, z: 0 }, { x: 2, y: 2, z: 0 },
  { x: 3, y: 2, z: 0 }, { x: 4, y: 2, z: 0 }, { x: 5, y: 2, z: 0 },
  { x: 6, y: 2, z: 0 }, { x: 7, y: 2, z: 0 }, { x: 8, y: 2, z: 0 },
  // add more positions as needed
];

const Board: React.FC = () => {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    const tiles = initializeTiles(positions);
    console.log('Initialized Tiles: ', tiles);
    dispatch({ type: 'SET_TILES', payload: tiles });
  }, [dispatch]);

  useEffect(() => {
    if (state.selectedTiles.length === 2) {
      const [first, second] = state.selectedTiles;
      const firstTile = state.tiles.find(tile => tile.id === first);
      const secondTile = state.tiles.find(tile => tile.id === second);
      if (firstTile && secondTile && firstTile.imageIndex === secondTile.imageIndex) {
        dispatch({ type: 'REMOVE_TILES' });
      } else {
        setTimeout(() => {
          dispatch({ type: 'RESET_SELECTION' });
        }, 1000);
      }
    }
  }, [state.selectedTiles, state.tiles, dispatch]);

  console.log('State Tiles: ', state.tiles);

  const hasTileUnderneath = (tile: TileType) => {
    return state.tiles.some(
      (t) => t.position.x === tile.position.x && t.position.y === tile.position.y && t.position.z === tile.position.z + 1
    );
  };

  return (
    <div className="board">
      {state.tiles.map(tile => (
        <Tile
          key={tile.id}
          id={tile.id}
          position={tile.position}
          imageIndex={tile.imageIndex}
          hasTileUnderneath={hasTileUnderneath(tile)}
        />
      ))}
    </div>
  );
};

export default Board;