import React from 'react';
import { Link } from 'react-router-dom';
import Board from './components/board';
import { clearGameState, initializeTiles } from './components/utils';
import { useContext } from 'react';
import { GameContext } from './GameContext';
import { generatePyramidPositions } from './components/utils'; // Import the function from the correct file

const Game: React.FC = () => {
  const { dispatch } = useContext(GameContext);

  const handleReset = () => {
    clearGameState();
    const positions = generatePyramidPositions(); // Use the imported function here
    const tiles = initializeTiles(positions);
    dispatch({ type: 'RESET_GAME', payload: tiles });
  };

  return (
    <div>
      <h1>Mahjong Game</h1>
      <div className="board-container">
        <Board />
      </div>
      <div className='button-container'>
      <button onClick={handleReset} className="reset-button">
        Reset Game
      </button>
      <button>
        <Link to="/2023-p3a-mpa-react-project-ksald-CZ">Back to Home</Link>
      </button>
      </div>
    </div>
  );
};

export default Game;
