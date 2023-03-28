const mongoose = require('mongoose');
const notification = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'account'
    },
    status:{
        type:Boolean,
        default: false
    }
});
const notificationSchema  =  mongoose.model('notification', notification);
module.exports = notificationSchema;