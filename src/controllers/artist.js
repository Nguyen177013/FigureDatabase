const artist = require('../models/artists');
const mongoose = require('mongoose');
const company = require('../models/Companys');
const companyController = require('./company');
const figure = require('../models/Figure')
class artistController{
    async artist_index(req,res){
        const artists = await artist.find();
        res.render('artist/index',{artists: artists});
    }
    async getArtist(req,res){
        let artId = req.params.id;
        let data = await artist.findById(artId);
        const figure_data = await figure.find({artists:mongoose.Types.ObjectId(artId)}).populate('origin').populate('company');
        let result = [];
        for(let ele of figure_data){
            companyController.containCompanies(ele.company,result);
        }
        res.render('Artist/detail',{artist:data,figures:figure_data,company:result});
    }
}
module.exports = new artistController;