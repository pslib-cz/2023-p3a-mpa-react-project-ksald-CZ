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
    dispatch({ type: 'SELECT_TILE', payload: id, dispatch });
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
