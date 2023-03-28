const { response } = require('express');
const path = require('path');
const paypal = require('paypal-rest-sdk');
const exphdbs=require('express-handlebars');


class CanController{
    async Can(req,res){
        res.render('body/cancel',{title:"cancel",user:undefined});
        res.send('Cancelled');
    }



    
    


}
module.exports = new CanController;