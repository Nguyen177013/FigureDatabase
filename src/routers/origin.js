const express = require('express');
const router = express.Router();
const origin = require('../controllers/origin');
router.get('/:id',origin.getOrigin);
module.exports = router;