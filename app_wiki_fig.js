const express = require('express');
const app = express();
const paypal = require('paypal-rest-sdk');
const router = require('./routers/socialMedia');
const media = require('./controllers/userPost');
const exphdbs=require('express-handlebars');
console.log(__dirname);
const path = require('path');
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
// app.engine('ejs',exphdbs.engine({defaultLayout:'main'}));
const context = require('./controllers/artistsController');
const figure = require('./controllers/figures');
const artist = require('./controllers/artists');
const postcheck = require('./controllers/PostCheck');
const characters = require('./controllers/characters');
const artists = require('./controllers/artists');
const companies = require('./controllers/companies');
const category = require('./controllers/categories');
const material = require('./controllers/Material');
const Original = require('./controllers/originals');
const Accounts = require('./controllers/accounts');
const Paypal = require('./controllers/Paypal');
const payment = require('./controllers/Turnover');
const success = require('./controllers/success');
const cancel = require('./controllers/cancel');
const statistics = require('./controllers/statistics')
const url = "mongodb+srv://Figure:Nguyen150801@figure.pd5pdzw.mongodb.net/figure_data?retryWrites=true&w=majority";
const multer = require('./multer');

// momo-----------------------------------------------------------------------------------------------------------
//https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
//parameters
var partnerCode = "MOMOOKYG20220406";
var accessKey = "PIARbaEf2koobiAd";
var secretkey = "kGNK3Eo7sqrRZzXKfrBSpDD3rvwcYd6t";
var requestId = partnerCode + new Date().getTime();
var orderId = requestId;
var orderInfo = "test";
var redirectUrl = "https://momo.vn/return";
var ipnUrl = "https://callback.url/notify";
var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
var amount = "50000";
var requestType = "captureWallet"
var extraData = ""; //pass empty value if your merchant does not have stores

//before sign HMAC SHA256 with format
//accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
//puts raw signature
console.log("--------------------RAW SIGNATURE----------------")
console.log(rawSignature)
//signature
const crypto = require('crypto');
var signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');
console.log("--------------------SIGNATURE----------------")
console.log(signature)

//json object send to MoMo endpoint
const requestBody = JSON.stringify({
    partnerCode : partnerCode,
    accessKey : accessKey,
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    redirectUrl : redirectUrl,
    ipnUrl : ipnUrl,
    extraData : extraData,
    requestType : requestType,
    signature : signature,
    lang: 'en'
});
//Create the HTTPS objects
const https = require('https');
const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
    }
}
//Send the request and get the response
app.get('/momo',function(req,response){

  const request = https.request(options, res => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (body) => {
        console.log('Body: ');
        console.log(body);
        console.log('payUrl: ');
        data = (JSON.parse(body).payUrl);
        response.json(data);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
})

request.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});
// write data to request body
console.log("Sending....")
request.write(requestBody);
request.end();

// res.redirect(jmessage.GetValue("payUrl").ToString());

})











// app.get('/',function(req,res){    
//     res.render('body/index',{title:'header',user:undefined});
// })



async function connectMongo(){
    await mongoose.connect(url,(err)=>{
        if(err){
            console.log("khong the ket noi db");
        }
        else{
            console.log("ket noi db thanh cong!");
        }
    })
}
connectMongo();

app.listen(42472,function () {
    console.log('Server run at 42472')
    
})
app.use(express.static(path.join(__dirname,"views")));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"public","img")));
app.use(express.static(path.join(__dirname,"public","css")));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/signin/',router);
app.use('/figure-wiki',router);
app.use('/user',router);
app.get('/',figure.index);
app.get('/detail/:id',figure.figDetail);
app.get('/artists',context.index);
app.get('/',figure.createIndex);
app.get('/detail/:id',figure.editIndex);  // hiển thị view của edit qua phương thức get
app.post('/detail/:id',multer.array("img",6),figure.editFigure); // cập nhật dữ liệu detail qua phương thức post
app.post('/',multer.array("img",6),figure.addFigure);
app.post('/addChar',multer.single("img"),characters.addChar);

app.get('/company/:name',companies.getComp);
app.get('/artists/:name',artists.getArt);
app.get('/character/:name',characters.getChar);
app.get('/origin/:name',Original.getOrg);
app.get('/category/:name',category.getCate);
app.get('/category/:name',category.getCate);
app.get('/origin/:name',characters.getChar);

app.get('/artistsHome',artist.indexArt);
app.get('/artistsDetail/:id',artist.artDetail);
app.get('/createArt',artists.artIndexCreate);
app.post('/artistsHome',multer.single('img'),context.addArtsit);
app.get('/artistsDetail/:id',artists.editIndexArt);  // hiển thị view của edit qua phương thức get
app.post('/artistsDetail/:id',multer.single('img'),artists.editArtist); // cập nhật dữ liệu detail qua phương thức post

app.get('/OriginalHome',Original.indexOrg);
app.get('/OriginalDetail/:id',Original.OrgDetail);
app.get('/OriginalHome',Original.orgIndexCreate);
app.post('/OriginalHome',multer.single('img'),Original.addOrg);
app.get('/OriginalDetail/:id',Original.editIndexOri);  // hiển thị view của edit qua phương thức get
app.post('/OriginalDetail/:id',multer.single('img'),Original.editOrigin); // cập nhật dữ liệu detail qua phương thức post


app.get('/charactersHome',characters.indexChar);
app.get('/charactersDetail/:id',characters.charDetail);
app.get('/createChar',characters.createCharIndex);
app.post('/charactersHome',multer.single('img'),characters.addChar);
app.get('/editChar/:id',multer.single('img'),characters.editIndexChar);  // hiển thị view của edit qua phương thức get
app.post('/editChar/:id',multer.single('img'),characters.editChar); // cập nhật dữ liệu detail qua phương thức post




app.get('/CompaniesHome',companies.indexCom);
app.get('/CompaniesDetail/:id',companies.comDetail);
app.get('/createCom',companies.comIndexCreate);
app.post('/CompaniesHome',multer.single('img'),companies.addCom);
app.get('/editCom/:id',companies.editIndexCom);  // hiển thị view của edit qua phương thức get
app.post('/editCom/:id',multer.single('img'),companies.editCom); // cập nhật dữ liệu detail qua phương thức post

app.get('/categoryHome',category.indexCate);
app.get('/categoryDetail/:id',category.cateDetail);
app.get('/createCate',category.cateIndexCreate);
app.post('/addCate',multer.single('img'),category.addCate);


app.get('/materialHome',material.indexMat);
app.get('/materialDetail/:id',material.matDetail);
app.get('/createMat',material.matIndexCreate);
app.post('/addMat',multer.single('img'),material.addMat);
app.get('/editMat/:id',material.editIndexMat);  // hiển thị view của edit qua phương thức get
app.post('/editMat/:id',multer.single('img'),material.editMaterial); // cập nhật dữ liệu detail qua phương thức post

app.get('/user/:id',Accounts.getUser);
app.post('/user_status',Accounts.setStatus);
app.get('/Dashbroad',Accounts.getTotal);
app.post('/123',Accounts.getDay);
app.post('/findPost',media.findpost);
app.get('/statistics',statistics.indexSta);
app.get('/PostCheck',postcheck.indexPost);
app.get('/DashbroadTurn',payment.getTotal);
app.post('/456',payment.getDay);
// paypal -------------------------------------------------------------



app.get('/PremiumAcc',Paypal.indexPay);



paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Ad2h6zAYoNvexN1akLK-oypNmdI1cuyeTfyaVxRmpX6No_WyM4XhyuBU19Jn0Wo6WlBn6JzWIUhJNqJ8',
    'client_secret': 'EIf3RP7cT25P-4Ebqrz2_gwe04_al8tlzxxbytq33eeOWb8u1Zg3hQRhoW-l3L-ms6PaNAtg58Lud5gU'
  });

  

  app.post('/pay',function(req,res){
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:42472/success",
          "cancel_url": "http://localhost:42472/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{"name": "Upgrade to Premium Account",
                         "sku": "001",
                         "price": "5.00",
                         "currency": "USD",
                         "quantity": 2  
                            
            }]
          },
          "amount": {
              "currency": "USD",
              "total": "10.00"
          },
          "description": "Hat for the best team ever"
      }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.render('cancle');
    } else {
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href);
          }
        }
        // console.log("Create Payment Response");
        // console.log(payment);

    }
    });

    app.get('/success',success.Suc);
    app.get('/cancel',cancel.Can);


  });

