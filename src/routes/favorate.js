const express = require('express');
const router = express.Router();
const favorate = require('../controllers/favorate');
const {requireAuth} = require('../middleware/authorization');
router.post('/add',requireAuth,favorate.addFavorate);
router.post('/add/post',favorate.postFavorate);
module.exports  = router;