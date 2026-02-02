import React from 'react';
import './StartScreen.css';

export default function StartScreen({ onStart }) {
    return (
        <div className="screen-container">
            <h1>The MET Timeline Quiz</h1>
            <p>Guess the year the art was created.</p>
            <button onClick={onStart}>Start Quiz</button>
        </div>
    );
}