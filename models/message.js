const mongoose = require('mongoose');
const user = require('./account');
const messageSchema = new mongoose.Schema({
    userSend:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'account'
    },
    userGet:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'account'
    },
    message:String,
    daySend:{
        type:Date,
        default:Date.now
    },
});
    messageSchema.statics.getSpecificChat= async function(idSend, idGet){
        let list = await this.find({$or:[{userGet:idGet,userSend:idSend},{userGet:idSend,userSend:idGet}]});
        return list;
    }
const message  =  mongoose.model('message', messageSchema);
module.exports = message;