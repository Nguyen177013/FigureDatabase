const express = require('express');
const url = "mongodb+srv://Figure:Nguyen150801@figure.pd5pdzw.mongodb.net/figure_data?retryWrites=true&w=majority";
const app = express();
const mongoose = require('mongoose');

//khoi tao server cho admin
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