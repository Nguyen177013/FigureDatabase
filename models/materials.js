const mongoose = require('mongoose');
const material = new mongoose.Schema({
    name:String,
    about:String,
    image:String,
});
const materialSchema  =  mongoose.model('materials', material);
module.exports = materialSchema;