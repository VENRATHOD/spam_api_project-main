const express = require('express');
const router = express.Router();
const { markSpam } = require('../controllers/spamController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/mark', authMiddleware, markSpam);

module.exports = router;
