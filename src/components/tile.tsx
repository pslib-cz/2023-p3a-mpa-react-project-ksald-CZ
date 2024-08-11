import React, { useContext } from 'react';
import { GameContext } from '../GameContext';
import '../App.css';
import images from './import-tiles';

interface TileProps {
  id: number;
  position: { x: number; y: number; z: number };
  imageIndex: number;
  hasTileUnderneath: boolean;
}

const Tile: React.FC<TileProps> = ({ id, position, imageIndex, hasTileUnderneath }) => {
  const { state, dispatch } = useContext(GameContext);

  const handleClick = () => {
    if (state.selectedTiles.includes(id)) {
      // Deselect the tile if it's already selected
      dispatch({ type: 'DESELECT_TILE', payload: id });
    } else {
      dispatch({ type: 'SELECT_TILE', payload: id });

      if (state.selectedTiles.length === 1) {
        const firstTileId = state.selectedTiles[0];
        const firstTile = state.tiles.find(tile => tile.id === firstTileId);
        const secondTile = state.tiles.find(tile => tile.id === id);

        if (firstTile && secondTile && firstTile.imageIndex === secondTile.imageIndex) {
          // If they match, remove the tiles after a short delay
          setTimeout(() => {
            dispatch({ type: 'REMOVE_TILES' });
          }, 300);
        } else {
          // If they don't match, reset selection after a delay
          setTimeout(() => {
            dispatch({ type: 'RESET_SELECTION' });
          }, 1000);
        }
      }
    }
  };

  const isSelected = state.selectedTiles.includes(id);

  const style = {
    left: `${position.x * 60}px`,
    top: `${position.y * 80}px`,
    zIndex: position.z * 10 + position.y,
    border: isSelected ? '3px solid #FFD700' : 'none',
    boxShadow: hasTileUnderneath ? '0 4px 8px rgba(0, 0, 0, 0.6)' : 'none',
  };

  const image = images[imageIndex];

  return (
    <div className="tile" onClick={handleClick} style={style}>
      <img src={image} alt={`tile-${id}`} />
    </div>
  );
};

export default Tile;
