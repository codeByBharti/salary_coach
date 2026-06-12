const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { analyzeSalary, getHistory, getSearchById, deleteSearch } = require('../controllers/salaryController');
const auth = require('../middleware/auth');

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 15,
  message: { success: false, message: 'Too many requests. Please wait a moment.' }
});

router.post('/analyze', auth, apiLimiter, analyzeSalary);
router.get('/history', auth, getHistory);
router.get('/:id', auth, getSearchById);
router.delete('/:id', auth, deleteSearch);

module.exports = router;
