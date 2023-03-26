const notificate = require('../models/notification');

class notificationController{
    async removeNotify(req,res){
        try{
            let {id} = req.body;
            let result = await notificate.remove({user:id});
            res.json(result)
        }
        catch(ex){
            console.log(ex.message);
        }
    }
}
module.exports = new notificationController;