const express = require('express');
const router = express.Router();
const category = require('../controllers/category');
router.get('/:id',category.figCate);
module.exports = router;