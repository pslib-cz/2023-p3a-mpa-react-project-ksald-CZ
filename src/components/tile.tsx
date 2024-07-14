// src/Tile.tsx
import React, { useContext } from 'react';
import  { GameContext } from '../GameContext';
import '../App.css';


import { images } from './utils';

interface TileProps {
  id: number;
  position: { x: number; y: number; z: number };
  imageIndex: number;
  hasTileUnderneath: boolean;
}

const Tile: React.FC<TileProps> = ({ id, position, imageIndex, hasTileUnderneath }) => {
  const { dispatch } = useContext(GameContext);

  const handleClick = () => {
    dispatch({ type: 'SELECT_TILE', payload: id });
  };

  const style = {
    left: `${position.x * 50}px`,
    top: `${position.y * 70}px`,
    zIndex: position.z,
    position: 'absolute' as const,
    boxShadow: hasTileUnderneath ? '0 4px 8px rgba(0, 0, 0, 0.6)' : 'none', // Apply shadow if tile has another tile underneath
  };

  const image = images[imageIndex];

  console.log(`Tile ${id} at (${position.x}, ${position.y}, ${position.z}) using image ${image}`);

  return (
    <div className="tile" onClick={handleClick} style={style}>
      <img src={image} alt={`tile-${id}`} />
    </div>
  );
};

export default Tile