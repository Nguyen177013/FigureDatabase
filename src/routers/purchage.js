const express = require('express');
const router = express.Router();
const purchageController = require('../controllers/purchange');
router.get('/',purchageController.purchageIndex);
router.get('/add',purchageController.add);
module.exports = router;