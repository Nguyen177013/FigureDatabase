const express = require('express');
const morgan = require("morgan");
const path = require('path');

//Lấy port 3000
const port = 3000;
const app = express();

//Library cho việc kiểm tra đường dẫn
app.use(morgan("dev"));
app.use(express.static(__dirname));    // dùng để liên kết các file theo đường dẫn của project vd: C:\Users\HP\Desktop\BàiTập\web\DoAn_v2\FigureCommunity  --PhanNguyen

app.set("views", path.join(__dirname,"src","views")); 
app.set('view engine', 'ejs');


// Cho server chạy theo port
app.listen(3000,()=>{
    console.log("server listening on port",port);
})
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/about',(req,res)=>{
    res.render('about');
})