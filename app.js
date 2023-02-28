const express = require('express');
const morgan = require("morgan");
const port = 3000;
const app = express();
app.use(morgan("dev"));  
app.listen(3000,()=>{
    console.log("server listening on port",port);
})
app.get('/',(req,res)=>{
    res.send("xin chào nodejs");
})