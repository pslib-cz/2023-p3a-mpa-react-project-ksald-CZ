import React, { useContext, useEffect, useMemo } from 'react';
import { GameContext, Tile as TileType } from '../GameContext';
import Tile from './tile';
import { initializeTiles, loadGameState, saveGameState, generatePyramidPositions } from './utils';
import '../App.css';



const Board: React.FC = () => { // Removed `onReset` prop
  const { state, dispatch } = useContext(GameContext);

  const positions = useMemo(() => generatePyramidPositions(), []);

  useEffect(() => {
    const savedTiles = loadGameState();
    if (savedTiles) {
      dispatch({ type: 'SET_TILES', payload: savedTiles });
    } else {
      const tiles = initializeTiles(positions);
      dispatch({ type: 'SET_TILES', payload: tiles });
    }
  }, [dispatch, positions]);

  useEffect(() => {
    if (state.tiles.length > 0) {
      saveGameState(state.tiles);
    }
  }, [state.tiles]);

  const hasTileUnderneath = (tile: TileType) => {
    return state.tiles.some(
      (t) => t.position.x === tile.position.x && t.position.y === tile.position.y && t.position.z === tile.position.z + 1
    );
  };

  return (
    <div>
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
    </div>
  );
};

export default Board;
