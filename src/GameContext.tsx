import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';

interface Tile {
  id: number;
  position: { x: number; y: number; z: number };
  imageIndex: number;
}

interface GameState {
  tiles: Tile[];
  selectedTiles: number[];
}

interface GameContextProps {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

const initialState: GameState = {
  tiles: [],
  selectedTiles: []
};

type GameAction =
  | { type: 'SET_TILES'; payload: Tile[] }
  | { type: 'SELECT_TILE'; payload: number; dispatch: Dispatch<GameAction>; }
  | { type: 'REMOVE_TILES' }
  | { type: 'RESET_SELECTION' }
  | { type: 'RESET_GAME'; payload: Tile[] };

const GameContext = createContext<GameContextProps>({ state: initialState, dispatch: () => null });

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_TILES':
      return { ...state, tiles: action.payload, selectedTiles: [] };
    case 'SELECT_TILE': {
      if (state.selectedTiles.includes(action.payload)) {
        // Deselect the tile if it's already selected
        return {
          ...state,
          selectedTiles: state.selectedTiles.filter(id => id !== action.payload),
        };
      }

      const newSelectedTiles = [...state.selectedTiles, action.payload];

      if (newSelectedTiles.length === 2) {
        const [firstTileId, secondTileId] = newSelectedTiles;
        const firstTile = state.tiles.find(tile => tile.id === firstTileId);
        const secondTile = state.tiles.find(tile => tile.id === secondTileId);

        if (firstTile && secondTile && firstTile.imageIndex === secondTile.imageIndex) {
          // If they match, dispatch REMOVE_TILES action
          return {
            ...state,
            tiles: state.tiles.filter(tile => !newSelectedTiles.includes(tile.id)),
            selectedTiles: []
          };
        } else {
          // If they don't match, reset selection after a delay
          setTimeout(() => {
            action.dispatch({ type: 'RESET_SELECTION' });
          }, 1000);
        }
      }

      return { ...state, selectedTiles: newSelectedTiles };
    }
    case 'REMOVE_TILES': {
      return {
        ...state,
        tiles: state.tiles.filter(tile => !state.selectedTiles.includes(tile.id)),
        selectedTiles: []
      };
    }
    case 'RESET_SELECTION':
      return { ...state, selectedTiles: [] };
    case 'RESET_GAME':
      return { ...state, tiles: action.payload, selectedTiles: [] };
    default:
      return state;
  }
};

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('mahjongGameState');
    if (savedState) {
      dispatch({ type: 'SET_TILES', payload: JSON.parse(savedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mahjongGameState', JSON.stringify(state.tiles));
  }, [state.tiles]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
export type { Tile };
