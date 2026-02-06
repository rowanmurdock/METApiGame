import React from 'react';
import './StartScreen.css';

export default function StartScreen({ isLoading, onStart }) {
    return (
        <div className="screen-container">
            <h1 className="focus-in-expand">The MET Timeline Quiz</h1>
            <p className="focus-in-expand">Guess the year the art was created.</p>
            <p className="focus-in-expand">You get points based on how many years off your guess is.</p>
            <p className="focus-in-expand">Negative numbers is equal to a BC guess (e.g. -500 = 500 BC).</p>
            <p className="focus-in-expand">Lowest score wins!</p>
            <button onClick={onStart} disabled={isLoading}>{isLoading ? 'Loading...' : 'Start Quiz'}</button>
        </div>
    );
}