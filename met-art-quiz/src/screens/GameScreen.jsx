import React, { useState } from 'react';
import './GameScreen.css';

export default function GameScreen({ artData, onRoundComplete }) {
    const [guess, setGuess] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!artData) return;

        const userGuess = parseInt(guess, 10);

        const points = Math.abs(artData.objectEndDate - userGuess);

        const roundResult = {
            image: artData.primaryImageSmall,
            title: artData.title,
            artist: artData.artistDisplayName,
            actualYear: artData.objectEndDate,
            userGuess: userGuess,
            points: points
        };

        onRoundComplete(roundResult);
    };

    return (
        <div className="game-container">
            <div className="art-frame">
                <img
                    src={artData.primaryImageSmall}
                    alt={artData.title}

                />
            </div>
            <div className="art-info">
                <h3>{artData.title}</h3>
                <p>{artData.artistDisplayName}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Guess a year"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    required
                />
                <button type="submit">Submit Guess</button>
            </form>
        </div>
    );
}