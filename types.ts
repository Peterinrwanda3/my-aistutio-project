
export enum GameState {
  Start = 'START',
  Playing = 'PLAYING',
  Finished = 'FINISHED',
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface KinyarwandaOption {
  translation: string;
  is_correct: boolean;
}

export interface QuizQuestion {
  english_phrase: string;
  kinyarwanda_options: KinyarwandaOption[];
}
