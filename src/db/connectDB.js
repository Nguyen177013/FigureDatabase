const mongoose = require('mongoose');
// const url = "mongodb+srv://Figure:Nguyen150801@figure.pd5pdzw.mongodb.net/figure_data?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/Figure";
async function connectMongo(){
    await mongoose.connect(url,(err)=>{
        if(err){
            throw Error("Can not connect to database");
        }
        else{
            console.log("Successfully connected to database");
        }
    })
}
module.exports = connectMongo;