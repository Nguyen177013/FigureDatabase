const Figure = require('../models/Figure');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins');
const clound = require('../cloudinary');
const path = require('path');
const multer  = require('multer');
const Artists = require('../models/artists');

class MatController{

    async indexMat (req,res){
        const material = await Materials.find().populate('name');
        console.log(material);
        res.render('body/materialHome',{data:material,title:"materialHome",user:undefined});
    }
    async matDetail(req, res){
        const matId = req.params.id;
        const data = await Materials.findById(matId).populate('name')
        .populate('about');
        let matID = data._id;
        console.log(data);
        const figures = await Figure.find({material: matID});
        // console.log('this is figure: ',figures);
        res.render('body/materialDetail',{title:"materialDetail",material:data,user:undefined,figures:figures});
    }
    async editIndexMat(req,res){
        const matId = req.params.id;
        const material = await Materials.find();
        const data = await Materials.findById(matId).populate('name')
        .populate('about');
        console.log(data);
        res.render('body/editMat',{title:"editMat",data:{material},user:undefined,detail:data});
    }
    async matIndexCreate(req,res){
        res.render('body/createMat',{title:'createMat',user:undefined})
    }
    async editMaterial(req,res){
        try{
            const matId = req.params.id;
            const data = req.body;
            if(req.file || req.files){
                const img = await clound.v2.uploader.upload(req.file.path,{folder: 'Materials', resource_type: 'image'});
                data['image'] = img.secure_url;
            }
            await Materials.findByIdAndUpdate(matId,data);
            await res.redirect('/');
        }
        catch(e){
            console.log(e.message);
        }
    }

    async addMat(req,res){
        try{   
        const data = req.body;
        const img = await clound.v2.uploader.upload(req.file.path,{folder: 'Materials', resource_type: 'image'});
        data['image'] = img.secure_url;
        await Materials.create(data);
        res.redirect('/');
        }
        catch(ex){
            console.log(ex.message);
        }
    }


    async getMat(req,res){
        let name = req.params.name;
      
        let data = await Materials.find({name:name});

      
        res.redirect(`/materialDetail/${data[0]._id}`);
    }
}
    module.exports = new MatController;















