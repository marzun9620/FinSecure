const express = require('express');
const router = express.Router();
const { createAdmin } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/role');

// Admin-only route to create a new admin
router.post('/create-admin', auth, isAdmin, createAdmin);

module.exports = router;
