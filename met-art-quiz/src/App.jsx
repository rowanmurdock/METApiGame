import React, { useState, useEffect } from 'react';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import EndScreen from './screens/EndScreen';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('start');
  const [round, setRound] = useState(1);
  const [history, setHistory] = useState([]);
  const [fetchedArt, setFetchedArt] = useState([]);
  const [preloadedArt, setPreloadedArt] = useState([]);
  const [loading, setLoading] = useState(false);


  //start loading art on app start and after game start, so that we have art ready for the next game
  useEffect(() => {
    setLoading(true);
    fetchArt().then(art => { setPreloadedArt(art); setLoading(false); });

  }, []);

  const startGame = async () => {
    const artToUse = preloadedArt.length > 0 ? preloadedArt : await fetchArt();

    setFetchedArt(artToUse);
    setRound(1);
    setHistory([]);
    setGameState('playing');
    fetchArt().then(art => setPreloadedArt(art));

  };


  //uses MET api to fetch 5 random paintings and ensure they have images
  const fetchArt = async () => {
    const fetchedArt = [];
    for (let i = 0; i < 5; i++) {
      try {
        const searchRes = await fetch(
          'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=painting'
        );
        const searchJson = await searchRes.json();

        let validArtFound = false;
        let data = null;

        while (!validArtFound) {
          const randomId = searchJson.objectIDs[Math.floor(Math.random() * searchJson.total)];
          const objectRes = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`
          );
          data = await objectRes.json();
          //keep searching until we find one with a valid image to be displayed
          if (data && data.primaryImageSmall && data.primaryImageSmall !== "") { validArtFound = true; }
        }
        fetchedArt.push(data);
      } catch (error) {
        console.error("Error fetching art:", error);
      }
    }
    return fetchedArt;
  }

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
      {gameState === 'start' && <StartScreen isLoading={loading} onStart={startGame} />}

      {gameState === 'playing' && fetchedArt.length > 0 && (
        <GameScreen
          key={round}
          artData={fetchedArt[round - 1]}
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