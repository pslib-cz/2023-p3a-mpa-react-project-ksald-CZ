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
  | { type: 'SELECT_TILE'; payload: number }
  | { type: 'DESELECT_TILE'; payload: number }
  | { type: 'REMOVE_TILES' }
  | { type: 'RESET_SELECTION' }
  | { type: 'RESET_GAME'; payload: Tile[] };

const GameContext = createContext<GameContextProps>({ state: initialState, dispatch: () => null });

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_TILES':
      return { ...state, tiles: action.payload, selectedTiles: [] };
    case 'SELECT_TILE': {
      if (state.selectedTiles.length === 2) {
        // If there are already 2 selected tiles, ignore further selections
        return state;
      }

      return { ...state, selectedTiles: [...state.selectedTiles, action.payload] };
    }
    case 'DESELECT_TILE': {
      return { ...state, selectedTiles: state.selectedTiles.filter(id => id !== action.payload) };
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
