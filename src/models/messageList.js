const mongoose = require('mongoose');
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
});    
messageSchema.statics.getChatList= async function(idSend){
    let list = await this.find({userSend:idSend}).populate('userSend').populate('userGet');
    return list;
}
const message  =  mongoose.model('messageList', messageSchema);
module.exports = message;