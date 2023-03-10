const mongoose = require('mongoose');
const categories = new mongoose.Schema({
    name:String,
});
const cateSchema = mongoose.model('categories', categories);

module.exports = cateSchema;