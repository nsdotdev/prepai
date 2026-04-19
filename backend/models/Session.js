const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, default: '' },
  score: { type: Number, default: 0, min: 0, max: 10 },
  feedback: { type: String, default: '' },
  strengths: { type: [String], default: [] },
  weaknesses: { type: [String], default: [] },
  improvedAnswer: { type: String, default: '' },
}, { _id: false });

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  role: { type: String, enum: ['Frontend', 'Backend', 'Full Stack'], required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  questions: { type: [questionSchema], required: true },
  totalScore: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
