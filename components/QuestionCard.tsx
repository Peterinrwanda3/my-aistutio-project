
import React from 'react';

interface QuestionCardProps {
  text: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ text }) => {
  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-md text-center border border-gray-200">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Translate this phrase:</p>
      <p className="text-2xl md:text-3xl font-bold text-brand-text">{text}</p>
    </div>
  );
};

export default QuestionCard;
