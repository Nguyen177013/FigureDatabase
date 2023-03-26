const express = require('express');
const router = express.Router();
const materials = require('../controllers/material');
router.get('/:id',materials.getMaterial);
module.exports = router;