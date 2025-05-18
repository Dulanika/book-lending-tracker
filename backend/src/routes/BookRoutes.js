const express = require('express');
const BookController = require('../controllers/BookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware);  

router.post('/', BookController.addBook);
router.get('/', BookController.getBooks);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

module.exports = router;
