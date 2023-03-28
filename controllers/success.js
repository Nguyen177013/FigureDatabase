const { response } = require('express');
const path = require('path');
const paypal = require('paypal-rest-sdk');
const exphdbs=require('express-handlebars');


class SucController{
    async Suc(req,res){
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                }
            }]
          };

          paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
               res.render('cancle');
            } else {
                console.log(JSON.stringify(payment));
                res.render('success');
            }
        });
        res.render('body/success',{title:"success",user:undefined});
    }



    
    


}
module.exports = new SucController;