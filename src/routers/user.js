const express = require('express');
const router = express.Router();
const Account = require('../controllers/user');
const upload = require('./multer');
const notify = require('../controllers/notification');
router.get('/:id',Account.getUser);
router.post('/remove_notify',notify.removeNotify);
router.post('/update/:id',upload.single('img'),Account.updateUser);
module.exports = router;