const express = require('express');
const router = express.Router();
const message = require('../controllers/userMessage');
router.get('/',message.message_get);
router.get('/:id',message.sendmessage_get);
router.post('/addList',message.addListMessage);
router.post('/sendmessage',message.addMessage);
module.exports = router;