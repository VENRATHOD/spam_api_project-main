const express = require('express');
const router = express.Router();
const { searchByName, searchByPhone } = require('../controllers/searchController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/name', authMiddleware, searchByName);
router.get('/phone', authMiddleware, searchByPhone);

module.exports = router;
