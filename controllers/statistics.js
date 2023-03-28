const Purchage = require('../models/purchage');
const Accounts = require('../models/account');

class staController{
    async indexSta(req,res){
        const account = await Accounts.find();
        const userId = req.params.id;
        const purchage = await Purchage.find().populate('user');
        const data = await Purchage.find();
        const statistics = await Purchage.find({purchage: userId}).populate('user');
        res.render('body/statistics',{title:"statistics",detail:data,user:undefined,statistics:statistics,data:{account,purchage}});
    }


}

module.exports = new staController;