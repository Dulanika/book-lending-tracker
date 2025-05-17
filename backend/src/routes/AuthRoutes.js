const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
// router.post('/login', (req, res) => {
//   res.json({ message: 'Login route works!' });
// });

module.exports = router;
