const express = require('express');
const { addCode } = require('../controllers/codeController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, admin, addCode);

module.exports = router;