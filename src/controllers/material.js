const material = require('../models/materials');
const mongoose = require('mongoose');
const company = require('../models/Companys');
const companyController = require('./company');
const figure = require('../models/Figure');

class materialController{
    async getMaterial(req,res){
        let mateId = req.params.id;
        let data = material.findById(mateId);
        const figure_data = await figure.find({materials:mongoose.Types.ObjectId(mateId)}).populate('origin').populate('company'); 
        let result = [];
        for(let ele of figure_data){
            companyController.containCompanies(ele.company,result);
        }
        res.render('Material/detail',{material:data,figures:figure_data,company:result});
    }
}
module.exports = new materialController;