const material = require('../models/materials');
class materialController{
    async getMaterial(req,res){
        let mateId = req.params.id;
        let data = material.findById(mateId);
        res.json({material:data});
    }
}
module.exports = new materialController;