const mongoose = require('mongoose');
const posts = require('./userpost');
const favorate = new mongoose.Schema({
    post:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'userPost'
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'account'
    },
    dayfollow:{
        type: Date,
        default:Date.now
    }
});
favorate.statics.totalFavorate = async function(){
    let total = await this.aggregate([    {
      '$group': {
        '_id': '$post', 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'count': -1
      }
    }, {
      '$addFields': {
        'figure': {
          '$toString': '$_id'
        }
      }
    }, {
      '$lookup': {
        'from': 'userposts', 
        'localField': '_id', 
        'foreignField': '_id', 
        'as': 'figure'
      }
    }]);
      return total;
}
const favorateSchema  =  mongoose.model('favoratePost', favorate);
module.exports = favorateSchema;