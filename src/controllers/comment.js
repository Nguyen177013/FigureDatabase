const Comment = require('../models/commentFig');
const postComment = require('../models/commentPost');
const mongoose = require('mongoose');
const account = require('../models/account');
const handleError = require('../middleware/handleError');
class commentController{
    async getAllComment(figId){
        try{
            let cmts = await Comment.find({figure:figId}).populate('user').sort({_id: -1});
            return cmts
        }
        catch(ex){
            console.log(ex.message);
        }
    }
    async addComment(req,res){
        try{
            const {user,figure,title} = req.body;
            let commentData = await Comment.create({user,figure,title});
            let data = await Comment.findById(commentData._id).populate('user')
            res.json({cmt:data});
        }
        catch(ex){
            let err = handleError(ex);
            console.log(err.message);
            res.json({err});
        }
    }
    async postsComment(req,res){
        try{
            let {postId,comment,userId} = req.body;
            let data = await postComment.create({user:userId,title:comment,post:postId});
            let info =  await postComment.findById(data._id).populate('user');
            res.json({comment:info})
        }
        catch(ex){
            console.log(ex.message);
        }
    }
}
module.exports = new commentController;