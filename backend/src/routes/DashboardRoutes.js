const express = require('express');
const DashboardController = require('../controllers/DashboardController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.get('/dashboard', DashboardController.getStats);

module.exports = router;
