
import React, { useState } from 'react';
import Tile from './tile';

interface BoardProps {
  tiles: Tile[];
}

const Board: React.FC<BoardProps> = ({ tiles }) => {
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);

  const handleTileSelect = (selectedTile: Tile) => {
    if (selectedTiles.length === 1 && selectedTiles[0].id !== selectedTile.id) {
      // Two tiles are already selected, check for a match
      if (selectedTiles[0].image === selectedTile.image) {
        // Match found, mark both tiles as matched
        const updatedTiles = tiles.map((tile) =>
          tile.id === selectedTile.id || tile.id === selectedTiles[0].id
            ? { ...tile, matched: true }
            : tile
        );
        setSelectedTiles([]);
        setTiles(updatedTiles);
      } else {
        // No match, reset selected tiles after a short delay
        setTimeout(() => {
          setSelectedTiles([]);
        }, 1000);
      }
    } else {
      // One tile is already selected, add the new tile to selectedTiles
      setSelectedTiles([selectedTile]);
    }
  };

  return (
    <div className="board">
      {tiles.map((tile) => (
        <Tile key={tile.id} tile={tile} onSelect={() => handleTileSelect(tile)} />
      ))}
    </div>
  );
};

export default Board;
