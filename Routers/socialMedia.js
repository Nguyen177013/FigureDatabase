const express = require('express');
const router = express.Router();
const media = require('../controllers/userPost');
const upload = require('./multer');
const {checkUser,requireAuth} = require('../middleware/authorization');
router.get('/',media.index);
router.post('/post',checkUser,upload.array('img',10),media.post);
router.post('/remove',media.remove);
module.exports = router;