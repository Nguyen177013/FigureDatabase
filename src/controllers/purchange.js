const purchage = require('../models/purchage');
class purchageController{
   purchageIndex(req,res){
           res.render('Purchage/purchage');
    }
    async add(req,res){
        try{
            let user = res.locals.user.id;
            console.log('this is user: ',user);
            await purchage.create({user});
            res.redirect('/');
        }catch(ex){
            console.log(ex.message);
        }
    }
}
module.exports = new purchageController;
