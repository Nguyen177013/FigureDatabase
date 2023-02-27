const mongoose = require('mongoose');
const origin = new mongoose.Schema({
    name:String,
    image:String
});
const originSchema  =  mongoose.model('origins', origin);
module.exports = originSchema;