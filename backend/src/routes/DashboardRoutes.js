const express = require('express');
const DashboardController = require('../controllers/DashboardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

router.get('/stats', DashboardController.getStats);

module.exports = router;
