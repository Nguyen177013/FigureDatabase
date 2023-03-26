const character = require('../models/Characters');
const figure = require('../models/Figure');
const origins = require('../models/origin')
const company = require('../models/Companys');
const mongoose = require('mongoose');
const companyController = require('../controllers/company')
class characterController{
    async character_index(req,res){
        const characters = await character.find();
        res.render('Character/index',{characters: characters});
    }
    async Character_get(req,res){
        const charId = req.params.id;
        const detail = await character.findById(charId);
        const figure_data = await figure.find({character:mongoose.Types.ObjectId(charId)}).populate('origin').populate('company');
        let result = [];
        for(let ele of figure_data){
            companyController.containCompanies(ele.company,result);
        }
        res.render('Character/detail',{character:detail,figures:figure_data,company:result});
    }
    async getAllChars(){
        const data = await character.find();
        return data;
    }
    async getCharbyOrg(req,res){
        const orgId = req.params.id;
        let characters = await figure.find({character:orgId});
        res.json({characters});
    }
}
module.exports = new characterController;