const PayMent = require('../models/payment');
const purchage = require('../models/purchage');
const https = require('https');
const { getOption } = require('../middleware/handleMoMo');
class payMentController {
    getMomo(req, response) {
        try {
            let userId = response.locals.user.id;
            let momoOption = getOption(userId);
            const request = https.request(momoOption.options, res => {
                console.log(`Status: ${res.statusCode}`);
                console.log(`Headers: ${JSON.stringify(res.headers)}`);
                let data = '';
                res.setEncoding('utf8');
                res.on('data', (body) => {
                    data = (JSON.parse(body).payUrl);
                    response.redirect(data);
                });
                res.on('end', () => {
                    console.log('No more data in response.');
                });
            })
            request.on('error', (e) => {
                console.log(`problem with request: ${e.message}`);
            });
            console.log("Sending....")
            request.write(momoOption.requestBody);
            request.end();
        }
        catch (ex) {
            console.log(ex.message);
        }
    }
    async momo_callBack(req,res){
        const user = req.query.partnerClientId;
        if(req.query.resultCode == 0){
            await PayMent.create({user});
            await purchage.create({user})
        }
        res.redirect('/figure-wiki');
    }
}
module.exports = new payMentController();