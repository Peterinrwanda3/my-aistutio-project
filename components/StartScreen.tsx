import React from 'react';
import { Difficulty } from '../types';
import { StarIcon } from './icons';

interface StartScreenProps {
  onStartGame: (difficulty: Difficulty) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-lg mx-auto border border-gray-200">
      <h1 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-2">Kinyarwanda Quest</h1>
      <p className="text-gray-600 mb-8 text-lg">Select a difficulty to begin your learning journey!</p>
      
      <div className="flex items-center justify-center mb-8">
        <StarIcon className="w-12 h-12 text-rw-yellow -rotate-12"/>
        <StarIcon className="w-16 h-16 text-rw-yellow"/>
        <StarIcon className="w-12 h-12 text-rw-yellow rotate-12"/>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => onStartGame(Difficulty.Easy)}
          className="w-full bg-brand-primary text-white font-bold py-4 px-6 rounded-xl text-xl hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Easy
        </button>
        <button
          onClick={() => onStartGame(Difficulty.Medium)}
          className="w-full bg-brand-incorrect text-white font-bold py-4 px-6 rounded-xl text-xl hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Medium
        </button>
        <button
          onClick={() => onStartGame(Difficulty.Hard)}
          className="w-full bg-rw-blue text-white font-bold py-4 px-6 rounded-xl text-xl hover:bg-blue-800 transition-transform transform hover:scale-105"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default StartScreen;