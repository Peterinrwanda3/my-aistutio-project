
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Difficulty, QuizQuestion } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const shuffleArray = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const generateQuizQuestion = async (difficulty: Difficulty): Promise<QuizQuestion> => {
  try {
    const prompt = `Generate a multiple-choice question to help an English speaker learn Kinyarwanda. The difficulty level is ${difficulty}. Provide an English phrase to be translated, one correct Kinyarwanda translation, and three plausible but incorrect Kinyarwanda translations.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              english_phrase: {
                type: Type.STRING,
                description: "The English phrase to be translated."
              },
              kinyarwanda_options: {
                type: Type.ARRAY,
                description: "An array of 4 Kinyarwanda options, one correct and three incorrect.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    translation: {
                      type: Type.STRING,
                      description: "A Kinyarwanda translation."
                    },
                    is_correct: {
                      type: Type.BOOLEAN,
                      description: "Whether this translation is the correct one."
                    }
                  },
                   required: ['translation', 'is_correct']
                }
              }
            },
            required: ['english_phrase', 'kinyarwanda_options']
          }
        },
    });

    const jsonText = response.text.trim();
    const parsedQuestion = JSON.parse(jsonText);
    
    // Ensure the options are shuffled for display
    parsedQuestion.kinyarwanda_options = shuffleArray(parsedQuestion.kinyarwanda_options);

    return parsedQuestion;
  } catch (error) {
    console.error("Error generating quiz question:", error);
    throw new Error("Failed to generate a new question. Please try again.");
  }
};
