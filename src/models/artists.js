const mongoose = require('mongoose');
const artistsSchema = new mongoose.Schema({
    name:String,
    Homepage:String,
    image:String
});
const Artists = mongoose.model('artists',artistsSchema);
module.exports = Artists;
