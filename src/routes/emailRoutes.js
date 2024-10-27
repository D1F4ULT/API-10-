const express = require('express');
const { verifyEmail } = require('../controllers/emailController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/verify', authMiddleware, verifyEmail);

module.exports = router;
