
import React from 'react';
import { CheckIcon, XIcon } from './icons';

interface AnswerButtonProps {
  optionText: string;
  isSelected: boolean;
  isCorrect: boolean;
  hasBeenAnswered: boolean;
  onClick: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ optionText, isSelected, isCorrect, hasBeenAnswered, onClick }) => {
  const getButtonClasses = () => {
    let baseClasses = "w-full text-left p-4 rounded-lg border-2 text-lg font-semibold transition-all duration-300 flex items-center justify-between";
    if (hasBeenAnswered) {
      if (isCorrect) {
        return `${baseClasses} bg-brand-correct/20 border-brand-correct text-brand-correct`;
      }
      if (isSelected && !isCorrect) {
        return `${baseClasses} bg-brand-incorrect/20 border-brand-incorrect text-brand-incorrect`;
      }
      return `${baseClasses} bg-gray-100 border-gray-300 text-gray-500`;
    }
    return `${baseClasses} bg-white border-gray-300 hover:border-brand-primary hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary`;
  };
  
  const getIcon = () => {
      if(hasBeenAnswered) {
          if(isCorrect) {
              return <CheckIcon className="w-6 h-6" />;
          }
          if(isSelected && !isCorrect) {
              return <XIcon className="w-6 h-6" />;
          }
      }
      return <div className="w-6 h-6"></div>; // Placeholder for alignment
  };

  return (
    <button
      onClick={onClick}
      disabled={hasBeenAnswered}
      className={getButtonClasses()}
    >
      <span>{optionText}</span>
      {getIcon()}
    </button>
  );
};

export default AnswerButton;
