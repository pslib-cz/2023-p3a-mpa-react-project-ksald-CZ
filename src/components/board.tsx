import React, { useContext, useEffect } from 'react';
import { GameContext, Tile as TileType } from '../GameContext';
import Tile from './tile';
import { initializeTiles, loadGameState, saveGameState, clearGameState } from './utils';
import '../App.css';

// Function to generate pyramid positions in 3D
export const generatePyramidPositions = (): { x: number; y: number; z: number }[] => {
  const positions = [];
  
  const centerOffsetX = 4; // Adjust for centering (assuming 0-indexed grid)
  const centerOffsetY = 4; // Adjust for centering

  const layers = [
    { size: 9, offsetX: 0, offsetY: 0 },  // Bottom layer
    { size: 7, offsetX: 1, offsetY: 1 },  // Second layer
    { size: 5, offsetX: 2, offsetY: 2 },  // Third layer
    { size: 3, offsetX: 3, offsetY: 3 },  // Fourth layer
    { size: 1, offsetX: 4, offsetY: 4 },  // Top layer
  ];

  layers.forEach((layer, z) => {
    const { size} = layer;
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        positions.push({
          x: centerOffsetX - Math.floor(size / 2) + x,
          y: centerOffsetY - Math.floor(size / 2) + y,
          z
        });
      }
    }
  });

  // Add side extensions
  const extensions = [
    { x: centerOffsetX - 2, y: centerOffsetY, z: 0 }, // Left extension
    { x: centerOffsetX + 2, y: centerOffsetY, z: 0 }, // Right extension
    { x: centerOffsetX, y: centerOffsetY - 2, z: 0 }, // Top extension
    { x: centerOffsetX, y: centerOffsetY + 2, z: 0 }, // Bottom extension
  ];
  positions.push(...extensions);

  return positions;
};




const Board: React.FC = () => {
  const { state, dispatch } = useContext(GameContext);

  const positions = generatePyramidPositions();

  useEffect(() => {
    const savedTiles = loadGameState();
    if (savedTiles) {
      dispatch({ type: 'SET_TILES', payload: savedTiles });
    } else {
      const tiles = initializeTiles(positions);
      dispatch({ type: 'SET_TILES', payload: tiles });
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.tiles.length > 0) {
      saveGameState(state.tiles);
    }
  }, [state.tiles]);

  const handleReset = () => {
    clearGameState();
    const tiles = initializeTiles(positions);
    dispatch({ type: 'RESET_GAME', payload: tiles });
  };

  const hasTileUnderneath = (tile: TileType) => {
    return state.tiles.some(
      (t) => t.position.x === tile.position.x && t.position.y === tile.position.y && t.position.z === tile.position.z + 1
    );
  };

  return (
    <div className="board-container">
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
      <button className="reset-button" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
};

export default Board;
