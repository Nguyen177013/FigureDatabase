const Figure = require('../models/Figure');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins');
const Accounts = require('../models/account');
const clound = require('../cloudinary');
const path = require('path');
const multer  = require('multer');
const Artists = require('../models/artists');
const Payment =require('../models/payment');
const { response } = require('express');

class TurnController{
    async indexTurn(req,res){
        const payment = await Payment.find()
        res.render('body/indexTurn',{data:payment});
    }
  
    async getTotal(req,res){
      const payment = await Payment.aggregate([  {
        '$project': {
          'year': {
            '$year': '$datePurchage'
          }, 
          '_id': 0
        }
      }]);
      let years = [];
      let check ={};
      for(let ele of payment){
        if(check[ele.year]){
          continue;
        }
        else
        years.push(ele.year)
        check[ele.year] = (check[ele.year] || 0 )+1;
      }
      console.log(years);
        res.render('body/DashbroadTurn',{title:"DashbroadTurn",user:undefined,years});
        
        }
    async getDay(req,res){
        let year = req.body.year;
        const Year = await Payment.aggregate([ {
            '$match': {
              'datePurchage': {
                '$gte': new Date(`${year}-01-01`), 
                '$lte': new Date(`${parseInt(year)+1}-01-01`)
              }
            }
          }, {
            '$group': {
              '_id': {
                  'month': {
                      '$month': '$datePurchage'
                  }, 
                  'year': {
                      '$year': '$datePurchage'
                  }
              }, 
              'count': {
                  '$sum': {
                      '$multiply': [
                          250000
                      ]
                  }
              }
          }
            
          }]);
        res.json(Year)

    }






}
module.exports = new TurnController;


