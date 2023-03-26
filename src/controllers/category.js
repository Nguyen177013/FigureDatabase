const Figure = require('../models/Figure');
const Categories = require('../models/Categories');

class cateController{
    async figCate(req,res){
        let cateId = req.params.id;
        let figure = await Figure.find({category: cateId});
        res.render('Category/items',{figures: figure});
    }
}

module.exports = new cateController();