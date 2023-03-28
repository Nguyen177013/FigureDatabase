const mongoose = require('mongoose');
const favorate = new mongoose.Schema({
    figure:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'figures'
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'accounts'
    },
    dayfollow:{
        type: Date,
        default:Date.now
    }
});
async function getUserFavorate(userId,favorate){
    let listFavorate = [];
    let userFavorate = await favorate.find({user:userId},{figure:1,_id:0});
    userFavorate.forEach(fig=>listFavorate.push(fig.figure));
    return listFavorate;
}
favorate.statics.recommendation = async function(userId){
    let listUser = await getUserFavorate(userId,this);
    let otherUser = [];
    let list = await this.find({$and:[{figure:{$in:listUser}},{user:{$nin:[userId]}}]},{user:1,_id:0});
    for(let ele of list){
        otherUser.push(ele.user);
    }
    let recommend = await this.aggregate([
      {
        '$match': {
          'user': {
            '$in': otherUser
          }
        }
      }, {
        '$group': {
          '_id': '$user', 
          'favorate': {
            '$push': '$figure'
          }
        }
      }, {
        '$match': {
          'favorate': {
            '$all': listUser
          }
        }
      }, {
        '$lookup': {
          'from': 'figures', 
          'localField': 'favorate', 
          'foreignField': '_id', 
          'as': 'figures'
        }
      }, {
        '$unwind': '$figures'
      },
      {
        '$group': {
            '_id': null, 
            'favorate': {
                '$addToSet': '$figures._id'
            }
        }
    }, {
        '$lookup': {
            'from': 'figures', 
            'localField': 'favorate', 
            'foreignField': '_id', 
            'as': 'figures'
        }
    }, {
        '$unwind': '$figures'
    }, {
        '$sample': {
          'size': 4
        }
      }
    ]);
    return recommend;
}
const favorateSchema  =  mongoose.model('favorate', favorate);
module.exports = favorateSchema;