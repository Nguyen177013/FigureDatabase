const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'account'
    },
    post:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'userpost'
    },
    title:{
        type:String,
        required:true,
    },
    dateComment:{
        type:Date,
        default:Date.now
    }
});
const Comment = mongoose.model('postComment',commentSchema);
module.exports = Comment;