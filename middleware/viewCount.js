const Viewer = require('../models/userView');

const addView = async(req, res, next) => {
    try{
        let userId = res.locals.user;
        let figureId = req.params.id;
        if(userId){
            let check = await Viewer.find({$and:[{user:userId},{figure:figureId}]});
            if(check.length<1){
                await Viewer.create({user:userId,figure:figureId});
            }
        }
        next();
    } catch(ex){
        console.log(ex.message);
    }
}
module.exports = {addView};