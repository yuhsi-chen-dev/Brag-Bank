import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

export const getOpenAIClient = () => {
  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
};

export const getOpenAIModel = () =>
  process.env.OPENAI_MODEL ?? 'gpt-4.1-mini';
