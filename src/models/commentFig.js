const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'account'
    },
    figure:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'figures'
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
const Comment = mongoose.model('figComment',commentSchema);
module.exports = Comment;