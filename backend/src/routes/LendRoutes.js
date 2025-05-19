const express = require('express');
const LendController = require('../controllers/LendController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

router.post('/return', LendController.returnBook);
router.post('/:id', LendController.lendBook);
router.get('/history', LendController.lendHistory);

module.exports = router;
