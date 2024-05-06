import tileImages from "./import-tiles";
interface Tile {
  id: number;
  image: string;
  matched: boolean;
}



export function generateTiles(): Tile[] {
  const tiles: Tile[] = [];
  for (let i = 0; i < tileImages.length; i++) {
    tiles.push({ id: i, image: tileImages[i], matched: false });
    tiles.push({ id: i, image: tileImages[i], matched: false });
  }
  // Shuffle tiles
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
}



interface TileProps {
  tile: Tile;
  onSelect: () => void;
}

const Tile: React.FC<TileProps> = ({ tile, onSelect }) => {
  const handleClick = () => {
    if (!tile.matched) {
      onSelect();
    }
  };

  return (
    <div className={`tile ${tile.matched ? 'matched' : ''}`} onClick={handleClick}>
      <img src={tile.image} alt={`Tile ${tile.id}`} />
    </div>
  );
};

export default Tile;
