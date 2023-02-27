const mongoose = require('mongoose');
const character = mongoose.Schema({
    name:String,
    original:String,
    image:String,
    origin:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:"origins"
    },
})
const characterSchema = mongoose.model('characters',character);
module.exports = characterSchema;