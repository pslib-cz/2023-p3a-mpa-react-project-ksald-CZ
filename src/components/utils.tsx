import { Tile } from '../GameContext';
const images = [
  'src/assets/tiles/chun.svg',
  'src/assets/tiles/haku.svg',
  'src/assets/tiles/hatsu.svg',
  'src/assets/tiles/man1.svg',
  'src/assets/tiles/man2.svg',
  // add more images as needed
];

export const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const hasPossibleMatch = (tiles: Tile[]): boolean => {
  const tileMap: { [key: number]: number } = {};

  tiles.forEach(tile => {
    const key = tile.imageIndex;
    if (tileMap[key]) {
      tileMap[key]++;
    } else {
      tileMap[key] = 1;
    }
  });

  return Object.values(tileMap).some(count => count > 1);
};

export const initializeTiles = (positions: { x: number; y: number; z: number }[]): Tile[] => {
  let tileCount = positions.length;

  if (tileCount % 2 !== 0) {
    console.warn('The number of positions is odd, removing the last position to make it even.');
    positions.pop();
    tileCount = positions.length;
  }

  const imageIndices = Array.from({ length: tileCount / 2 }, (_, index) => index % images.length);
  const pairedIndices = [...imageIndices, ...imageIndices]; // Create pairs
  shuffleArray(pairedIndices);

  const tileArray: Tile[] = positions.map((position, index) => ({
    id: index,
    position,
    imageIndex: pairedIndices[index],
  }));

  while (!hasPossibleMatch(tileArray)) {
    shuffleArray(pairedIndices);
    tileArray.forEach((tile, index) => {
      tile.imageIndex = pairedIndices[index];
    });
  }

  return tileArray;
};

export { images };
