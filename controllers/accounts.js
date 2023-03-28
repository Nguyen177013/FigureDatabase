const Figure = require('../models/Figure');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins');
const Accounts = require('../models/account');
const clound = require('../cloudinary');
const Posts = require('../models/socialMedia');
const path = require('path');
const multer  = require('multer');
const Artists = require('../models/artists');
const notification = require('../models/notification');
const mongoose = require('mongoose');
class AccController{
    async indexAcc(req,res){
        const accounts = await Accounts.find()
        res.render('body/indexAcc',{data:accounts});
    }
  
    async getTotal(req,res){
        let account = await Accounts.aggregate([  {
          '$project': {
            'year': {
              '$year': '$dateCreate'
            }, 
            '_id': 0
          }
        }]);
        let check ={};
        let result = [];
        for(let ele of account){
          if(check[ele.year]){
            continue;
          }
          else
          result.push(ele.year)
          check[ele.year] = (check[ele.year] || 0 )+1;
        }
        console.log(result);
        res.render('body/Dashbroad',{title:"Dashbroad",user:undefined,years:result});
        
        }
        async getUser(req,res){
          let userId = req.params.id;
          let data = await Accounts.findById(userId);
          let posts = await Posts.find({user:mongoose.Types.ObjectId(userId)}).populate('user').sort({_id:-1});
          res.render('SocialMedia/profile',{title:"Dashbroad",user:undefined,userd:data,posts});
        }
        async setStatus(req,res){
            let {id} = req.body;
            let check = await Accounts.findById(id);
            console.log(check.status);
            if(check.status){
              await Accounts.findByIdAndUpdate(id,{status:false});
              await notification.create({user:id});
              return res.json({ add: 1 });
            }
            else{
              await Accounts.findByIdAndUpdate(id,{status:true});
              return res.json({ remove: 1 });
            }
        }
    async getDay(req,res){
        let year = req.body.year;
        const Year = await Accounts.aggregate([ {
            '$match': {
              'dateCreate': {
                '$gte': new Date(`${year}-01-01`), 
                '$lte': new Date(`${parseInt(year)+1}-01-01`)
              }
            }
          }, {
            '$group': {
              '_id': {
                'month': {
                  '$month': '$dateCreate'
                }, 
                'year': {
                  '$year': '$dateCreate'
                }
              }, 
              'count': {
                '$sum': 1
              }
            }
          }]);
        res.json(Year)

    }






}
module.exports = new AccController;


