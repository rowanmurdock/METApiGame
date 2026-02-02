import React from 'react';
import './EndScreen.css';

export default function EndScreen({ history, onRestart }) {
    const totalScore = history.reduce((acc, round) => acc + round.points, 0);

    return (
        <div className="screen-container">
            <h2>Total Score: {totalScore} points</h2>

            <div className="results-grid">
                {history.map((round, index) => (
                    <div key={index} className="result-card">
                        <img src={round.image} alt={round.title} width="100" />
                        <div>
                            <strong>{round.title}</strong>
                            <p>Actual: {round.actualYear}</p>
                            <p>Your Guess: {round.userGuess}</p>
                            <p className="points">Points: +{round.points}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={onRestart}>Play Again</button>
        </div>
    );
}