
import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Difficulty, QuizQuestion, KinyarwandaOption } from './types';
import { TOTAL_ROUNDS } from './constants';
import { generateQuizQuestion } from './services/geminiService';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.Start);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<KinyarwandaOption | null>(null);

  const fetchQuestion = useCallback(async (currentDifficulty: Difficulty) => {
    setIsLoading(true);
    setError(null);
    setSelectedAnswer(null);
    try {
      const question = await generateQuizQuestion(currentDifficulty);
      setCurrentQuestion(question);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (gameState === GameState.Playing && difficulty && round > 0) {
      fetchQuestion(difficulty);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, round, difficulty]);

  const handleStartGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameState(GameState.Playing);
    setRound(1);
    setScore(0);
  };

  const handleSelectAnswer = (option: KinyarwandaOption) => {
    if (selectedAnswer) return; // Prevent changing answer

    setSelectedAnswer(option);
    if (option.is_correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (round >= TOTAL_ROUNDS) {
      setGameState(GameState.Finished);
    } else {
      setRound(prev => prev + 1);
    }
  };
  
  const handlePlayAgain = () => {
    setGameState(GameState.Start);
    setScore(0);
    setRound(0);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setDifficulty(null);
  };

  const renderContent = () => {
    if (error) {
        return (
            <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-lg mx-auto border border-red-300">
                <h2 className="text-2xl font-bold text-brand-incorrect mb-4">Oops! Something went wrong.</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                    onClick={handlePlayAgain}
                    className="bg-brand-primary text-white font-bold py-3 px-6 rounded-xl text-lg hover:bg-blue-700 transition-transform"
                >
                    Try Again
                </button>
            </div>
        )
    }

    switch (gameState) {
      case GameState.Start:
        return <StartScreen onStartGame={handleStartGame} />;
      case GameState.Playing:
        return (
          <GameScreen
            question={currentQuestion}
            isLoading={isLoading}
            score={score}
            round={round}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            onNextQuestion={handleNextQuestion}
          />
        );
      case GameState.Finished:
        return <EndScreen score={score} onPlayAgain={handlePlayAgain} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-rw-blue/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rw-green/20 rounded-full translate-x-1/2 translate-y-1/2"></div>
      <main className="z-10 w-full">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
