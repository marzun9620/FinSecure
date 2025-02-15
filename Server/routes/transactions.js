// routes/transactions.js
const express = require('express');
const router = express.Router();
const { createTransaction } = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// Protected route for creating a transaction
router.post('/', auth, createTransaction);

module.exports = router;
