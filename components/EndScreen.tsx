
import React from 'react';
import { TOTAL_ROUNDS } from '../constants';
import { StarIcon } from './icons';

interface EndScreenProps {
  score: number;
  onPlayAgain: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, onPlayAgain }) => {
  const getFeedback = () => {
    const percentage = (score / TOTAL_ROUNDS) * 100;
    if (percentage >= 80) return "Excellent! You're a Kinyarwanda pro!";
    if (percentage >= 50) return "Great job! Keep practicing!";
    return "Good start! Don't give up!";
  };
  
  return (
    <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-200">
      <h2 className="text-3xl font-bold text-brand-text mb-4">Game Over!</h2>
      <p className="text-xl text-gray-600 mb-6">{getFeedback()}</p>
      
      <div className="bg-brand-bg p-6 rounded-xl mb-8">
        <p className="text-lg text-gray-500">Your Final Score</p>
        <div className="flex items-center justify-center space-x-3 mt-2">
            <StarIcon className="w-12 h-12 text-rw-yellow" />
            <p className="text-6xl font-bold text-brand-primary">{score}</p>
            <p className="text-2xl font-semibold text-gray-500 self-end pb-1">/ {TOTAL_ROUNDS}</p>
        </div>
      </div>

      <button
        onClick={onPlayAgain}
        className="w-full bg-brand-primary text-white font-bold py-4 px-6 rounded-xl text-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
};

export default EndScreen;
