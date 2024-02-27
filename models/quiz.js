import mongoose, { Schema } from 'mongoose';

/**
 * A quiz has a title and an array of questions.
 * Each question has a type, prompt, choices, and answer.
 * 3 types: matching, multiple choice, true and false.
 */

const quizSchema = new Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    questions: [{
      type: { type: String, required: true, enum: ['Matching', 'TF', 'MC'] },
      prompt: { type: String, required: true },
      choices: { required: true },
      answer: { required: true },
    }],
  },
  {
    timestamps: true,
  },
);

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);

export default Quiz;
