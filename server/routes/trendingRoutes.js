const express = require('express');
const router = express.Router();
const { getTrending, getBenchmark, getCityComparison } = require('../controllers/trendingController');

router.get('/', getTrending);
router.get('/benchmark', getBenchmark);
router.get('/cities', getCityComparison);

module.exports = router;
