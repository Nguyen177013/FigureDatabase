const origins = require('../models/origin');
const figure = require('../models/Figure');
const mongoose = require('mongoose');
const company = require('../models/Companys');
const companyController = require('./company');
class originController{
    async getOrigin(req,res){
        let orgId = req.params.id;
        let data = await origins.findById(orgId);
        const figure_data = await figure.find({origin:mongoose.Types.ObjectId(orgId)}).populate('origin').populate('company');
        let result = [];
        for(let ele of figure_data){
            companyController.containCompanies(ele.company,result);
        }
        res.render('Origin/detail',{origin:data,figures:figure_data,company:result});
    }
}
module.exports = new originController;