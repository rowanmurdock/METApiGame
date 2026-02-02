import React, { useState } from 'react';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import EndScreen from './screens/EndScreen';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('start');
  const [round, setRound] = useState(1);
  const [history, setHistory] = useState([]);

  const startGame = () => {
    setRound(1);
    setHistory([]);
    setGameState('playing');
  };

  const handleRoundComplete = (roundData) => {
    const newHistory = [...history, roundData];
    setHistory(newHistory);

    if (round < 3) {
      setRound(round + 1);
    } else {
      setGameState('end');
    }
  };

  return (
    <div className="App">
      {gameState === 'start' && <StartScreen onStart={startGame} />}

      {gameState === 'playing' && (
        <GameScreen
          key={round}
          onRoundComplete={handleRoundComplete}
        />
      )}

      {gameState === 'end' && (
        <EndScreen
          history={history}
          onRestart={startGame}
        />
      )}
    </div>
  );
}

export default App;