const express = require('express');
const router = express.Router();
const Account = require('../controllers/user');
const upload = require('./multer');
router.get('/:id',Account.getUser);
router.post('/update/:id',upload.single('img'),Account.updateUser);
module.exports = router;