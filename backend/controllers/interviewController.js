const Session = require('../models/Session');
const aiService = require('../services/aiService');

const startInterview = async (req, res) => {
  try {
    const { role, difficulty } = req.body;
    if (!role || !difficulty)
      return res.status(400).json({ message: 'Role and difficulty are required' });
    const questions = await aiService.generateQuestions(role, difficulty);
    res.json({ questions });
  } catch (error) {
    console.error('Start interview error:', error);
    res.status(500).json({ message: 'Failed to generate questions' });
  }
};

const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer, role, difficulty } = req.body;
    if (!question || answer === undefined)
      return res.status(400).json({ message: 'Question and answer are required' });
    const evaluation = await aiService.evaluateAnswer(question, answer, role, difficulty);
    res.json(evaluation);
  } catch (error) {
    console.error('Evaluate error:', error);
    res.status(500).json({ message: 'Failed to evaluate answer' });
  }
};

const saveSession = async (req, res) => {
  try {
    const { role, difficulty, questions } = req.body;
    if (!role || !difficulty || !questions?.length)
      return res.status(400).json({ message: 'Invalid session data' });

    const totalScore = questions.reduce((sum, q) => sum + (q.score || 0), 0);
    const averageScore = parseFloat((totalScore / questions.length).toFixed(1));

    const session = await Session.create({
      userId: req.user._id,
      role,
      difficulty,
      questions,
      totalScore,
      averageScore,
    });

    res.status(201).json({ session, message: 'Session saved successfully' });
  } catch (error) {
    console.error('Save session error:', error);
    res.status(500).json({ message: 'Failed to save session' });
  }
};

const getHistory = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ sessions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};

const getSessionById = async (req, res) => {
  try {
    const session = await Session.findOne({ _id: req.params.id, userId: req.user._id });
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json({ session });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch session' });
  }
};

module.exports = { startInterview, evaluateAnswer, saveSession, getHistory, getSessionById };
