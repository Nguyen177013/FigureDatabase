const artist = require('../models/artists');
const mongoose = require('mongoose');

class artistController{
    async artist_index(req,res){
        const artists = await artist.find();
        res.json({artists: artists});
    }
    async getArtist(req,res){
        let artId = req.params.id;
        let data = await artist.findById(artId);
        res.json({artist:data});
    }
}
module.exports = new artistController;