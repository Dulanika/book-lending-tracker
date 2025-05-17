const express = require('express');
const LendController = require('../controllers/LendController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();
router.use(authMiddleware);

router.post('/lend', LendController.lendBook);
router.post('/return', LendController.returnBook);
router.get('/history', LendController.lendHistory);

module.exports = router;
