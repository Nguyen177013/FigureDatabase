const mongoose = require('mongoose');
const cloudinary = require('../controllers/cloudinary');
const mediaPostsSchema = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'account'
    },
    dayPost:{
        type:Date,
        default:Date.now
    },
    images:[{
        id:String,
        url:String
    }],
    title:String,
    origin:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"characters"
    },
    character:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"figures"
    },
    privacy:{
        type:Boolean,
        default: false
    }
});
mediaPostsSchema.post('remove', async function () {
    console.log('success removed');
    this.images.forEach(async image=>{
        console.log(image);
        await cloudinary.uploader.destroy(image.id);
    })
});
mediaPostsSchema.statics.index = async function(){
    const list = this.aggregate([
        {
            '$group': {
              '_id': '$post', 
              'count': {
                '$sum': 1
              }
            }
          }, {
            '$lookup': {
              'from': 'userposts', 
              'localField': '_id', 
              'foreignField': '_id', 
              'as': 'post'
            }
          }
    ]);
    return list;
}
const mediaPosts  =  mongoose.model('userPost', mediaPostsSchema);
module.exports = mediaPosts;