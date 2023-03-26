const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const {checkUser,requireAuth} = require('../middleware/authorization');
router.post('/add',(req,res)=>{
    
});
module.exports = router;