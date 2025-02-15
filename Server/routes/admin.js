const express = require('express');
const router = express.Router();
const { createAdmin } = require('../controllers/adminController'); 
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/role');

if (!createAdmin) {
  throw new Error("❌ createAdmin is undefined. Check adminController.js.");
}

router.post('/create-admin', auth, isAdmin, createAdmin);

module.exports = router;
