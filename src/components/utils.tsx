import { Tile } from '../GameContext';
import images from './import-tiles';

// Function to shuffle an array
export const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to determine if a tile is solvable
const isSolvable = (tiles: Tile[], tile: Tile): boolean => {
  const { x, y, z } = tile.position;

  // Check if there is any tile directly on top of this one
  const hasTileAbove = tiles.some(t => t.position.x === x && t.position.y === y && t.position.z === z + 1);
  if (hasTileAbove) {
    return false;
  }

  // Check if the tile is blocked horizontally on the same layer
  const hasLeftNeighbor = tiles.some(t => t.position.x === x - 1 && t.position.y === y && t.position.z === z);
  const hasRightNeighbor = tiles.some(t => t.position.x === x + 1 && t.position.y === y && t.position.z === z);

  // Check if the tile is blocked vertically on the same layer
  const hasTopNeighbor = tiles.some(t => t.position.x === x && t.position.y === y - 1 && t.position.z === z);
  const hasBottomNeighbor = tiles.some(t => t.position.x === x && t.position.y === y + 1 && t.position.z === z);

  // A tile is solvable if it's not blocked on either the left or right side, or on the top or bottom side.
  return (!hasLeftNeighbor || !hasRightNeighbor) && (!hasTopNeighbor || !hasBottomNeighbor);
};

// Function to check if there is at least one possible match
export const hasPossibleMatch = (tiles: Tile[]): boolean => {
  const tileMap: { [key: number]: number } = {};

  tiles.forEach(tile => {
    // Only consider solvable tiles
    if (isSolvable(tiles, tile)) {
      const key = tile.imageIndex;
      if (tileMap[key]) {
        tileMap[key]++;
      } else {
        tileMap[key] = 1;
      }
    }
  });

  // If any imageIndex has more than one solvable tile, a match is possible
  return Object.values(tileMap).some(count => count > 1);
};

// Function to initialize the tiles on the board
export const initializeTiles = (positions: { x: number; y: number; z: number }[]): Tile[] => {
  let tileCount = positions.length;

  // Ensure the number of positions is even
  if (tileCount % 2 !== 0) {
    console.warn('The number of positions is odd, removing the last position to make it even.');
    positions.pop();
    tileCount = positions.length;
  }

  // Create pairs of image indices for the tiles
  const imageIndices = Array.from({ length: tileCount / 2 }, (_, index) => index % images.length);
  const pairedIndices = [...imageIndices, ...imageIndices]; // Create pairs
  shuffleArray(pairedIndices);

  // Map positions to tiles with image indices
  const tileArray: Tile[] = positions.map((position, index) => ({
    id: index,
    position,
    imageIndex: pairedIndices[index],
  }));

  // Ensure there is at least one possible match
  while (!hasPossibleMatch(tileArray)) {
    shuffleArray(pairedIndices);
    tileArray.forEach((tile, index) => {
      tile.imageIndex = pairedIndices[index];
    });
  }

  return tileArray;
};

// Function to save the game state to localStorage
export const saveGameState = (boardState: unknown) => {
  try {
    localStorage.setItem('mahjongGameState', JSON.stringify(boardState));
  } catch (error) {
    console.error("Failed to save the game state.", error);
  }
};

// Function to load the game state from localStorage
export const loadGameState = () => {
  try {
    const savedState = localStorage.getItem('mahjongGameState');
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error("Failed to load the game state.", error);
    return null;
  }
};

// Function to clear the saved game state from localStorage
export const clearGameState = () => {
  try {
    localStorage.removeItem('mahjongGameState');
  } catch (error) {
    console.error("Failed to clear the game state.", error);
  }
};
export const generatePyramidPositions = (): { x: number; y: number; z: number }[] => {
  const positions: { x: number; y: number; z: number }[] = [];
  
  const centerOffsetX = 5.5; // Adjust for centering (assuming 0-indexed grid)
  const centerOffsetY = 4.2; // Adjust for centering

  const layers = [
    { size: 9, offsetX: 0, offsetY: 0 },  // Bottom layer
    { size: 7, offsetX: 1, offsetY: 1 },  // Second layer
    { size: 5, offsetX: 2, offsetY: 2 },  // Third layer
    { size: 3, offsetX: 3, offsetY: 3 },  // Fourth layer
    { size: 1, offsetX: 4, offsetY: 4 },  // Top layer
  ];

  layers.forEach((layer, z) => {
    const { size } = layer;
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

  return positions;
};