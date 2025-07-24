
import React from 'react';
import { StarIcon } from './icons';

interface ScoreDisplayProps {
  score: number;
  round: number;
  totalRounds: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, round, totalRounds }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-2xl mx-auto p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center space-x-3">
        <StarIcon className="w-8 h-8 text-rw-yellow" />
        <span className="text-2xl font-bold text-brand-text">{score}</span>
      </div>
      <div className="text-lg font-semibold text-gray-600">
        Round <span className="text-brand-primary font-bold">{Math.min(round, totalRounds)}</span> / {totalRounds}
      </div>
    </div>
  );
};

export default ScoreDisplay;
