const origins = require('../models/origin');
class originController{
    async getOrigin(req,res){
        let orgId = req.params.id;
        let data = await origins.findById(orgId);
        res.json({origin:data});
    }
}
module.exports = new originController;