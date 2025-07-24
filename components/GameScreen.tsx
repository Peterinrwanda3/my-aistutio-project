
import React from 'react';
import { QuizQuestion, KinyarwandaOption } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ScoreDisplay from './ScoreDisplay';
import QuestionCard from './QuestionCard';
import AnswerButton from './AnswerButton';
import { TOTAL_ROUNDS } from '../constants';

interface GameScreenProps {
  question: QuizQuestion | null;
  isLoading: boolean;
  score: number;
  round: number;
  selectedAnswer: KinyarwandaOption | null;
  onSelectAnswer: (option: KinyarwandaOption) => void;
  onNextQuestion: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
  question,
  isLoading,
  score,
  round,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
}) => {
  const hasBeenAnswered = selectedAnswer !== null;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <ScoreDisplay score={score} round={round} totalRounds={TOTAL_ROUNDS} />

      <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 min-h-[30rem] flex flex-col justify-center">
        {isLoading && <LoadingSpinner />}
        {!isLoading && question && (
          <div className="space-y-6 animate-fade-in">
            <QuestionCard text={question.english_phrase} />
            <div className="space-y-3">
              {question.kinyarwanda_options.map((option, index) => (
                <AnswerButton
                  key={index}
                  optionText={option.translation}
                  onClick={() => onSelectAnswer(option)}
                  isSelected={selectedAnswer?.translation === option.translation}
                  isCorrect={option.is_correct}
                  hasBeenAnswered={hasBeenAnswered}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {hasBeenAnswered && (
        <div className="text-center">
          <button
            onClick={onNextQuestion}
            className="bg-brand-primary text-white font-bold py-3 px-10 rounded-full text-xl hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg animate-fade-in"
          >
            {round >= TOTAL_ROUNDS ? 'Finish' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
