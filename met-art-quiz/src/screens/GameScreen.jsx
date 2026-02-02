import React, { useState, useEffect } from 'react';
import './GameScreen.css';

const parseYear = (dateString) => {
    if (!dateString) return null;
    const match = dateString.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : null;
};

export default function GameScreen({ onRoundComplete }) {
    const [artData, setArtData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [guess, setGuess] = useState('');

    useEffect(() => {
        fetchArt();
    }, []);

    const fetchArt = async () => {
        setLoading(true);
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

                if (data.objectDate && parseYear(data.objectDate)) {
                    validArtFound = true;
                }
            }
            setArtData(data);
        } catch (error) {
            console.error("Error fetching art:", error);
        }
        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!artData) return;

        const actualYear = parseYear(artData.objectDate);
        const userGuess = parseInt(guess, 10);

        const points = Math.abs(actualYear - userGuess);

        const roundResult = {
            image: artData.primaryImageSmall,
            title: artData.title,
            artist: artData.artistDisplayName,
            actualYear: actualYear,
            userGuess: userGuess,
            points: points
        };

        onRoundComplete(roundResult);
    };

    if (loading) return <div>Loading Masterpiece...</div>;

    return (
        <div className="game-container">
            <div className="art-frame">
                <img
                    src={artData.primaryImageSmall}
                    alt={artData.title}
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
            </div>
            <div className="art-info">
                <h3>{artData.title}</h3>
                <p>{artData.artistDisplayName}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Year (e.g. 1990)"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    required
                />
                <button type="submit">Submit Guess</button>
            </form>
        </div>
    );
}