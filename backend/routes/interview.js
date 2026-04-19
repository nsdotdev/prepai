const express = require('express');
const router = express.Router();
const {
  startInterview,
  evaluateAnswer,
  saveSession,
  getHistory,
  getSessionById,
} = require('../controllers/interviewController');
const { protect } = require('../middleware/auth');

router.post('/start', protect, startInterview);
router.post('/answer', protect, evaluateAnswer);
router.post('/save', protect, saveSession);
router.get('/history', protect, getHistory);
router.get('/history/:id', protect, getSessionById);

module.exports = router;
