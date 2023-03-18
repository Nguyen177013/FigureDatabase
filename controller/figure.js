const Figure = require('../models/Figure');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins')
const clound = require('../cloudinary');
const path = require('path');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname, '..','public',"img"))
    },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+path.extname(file.originalname));
    },
});


const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 25
    },
}).array('img',20);



class FigureController{

    // hiển thị thông tin index
    async index (req,res){
        const artists = await Artist.find();
        const categories = await Categories.find();
        const characters = await Characters.find();
        const companies = await Companies.find();
        const materials = await Materials.find();
        const origins = await Origins.find();
        const figId = req.params.id;
        const data =  await Figure.findById(figId).populate('category')
        .populate('artists').populate('character')
        .populate('origin').populate('company').populate('materials');
        // console.log(figures);
        const figures = await Figure.find().populate('category').populate('artists').populate('character');
        res.render('body/index',{figure:data,title:"home",user:undefined,data:{artists,categories,characters,companies,materials,origins},figures:figures});
    }
    async figDetail(req, res){
        const artists = await Artist.find();
        const categories = await Categories.find();
        const characters = await Characters.find();
        const companies = await Companies.find();
        const materials = await Materials.find();
        const origins = await Origins.find();
        const figId = req.params.id;
        const data = await Figure.findById(figId).populate('category')
        .populate('artists').populate('character')
        .populate('origin').populate('company').populate('materials');
        res.render('body/detail',{title:"detail",figure:data,user:undefined,data:{artists,categories,characters,companies,materials,origins}});
    }

    async editIndex(req,res){
        const figId = req.params.id;
        const artists = await Artist.find();
        const categories = await Categories.find();
        const characters = await Characters.find();
        const companies = await Companies.find();
        const materials = await Materials.find();
        const origins = await Origins.find();
        const data = await Figure.findById(figId).populate('category')
        .populate('artists').populate('character')
        .populate('origin').populate('company').populate('materials');
       
        res.render('body/detail',{title:"detail",data:{artists,categories,characters,companies,materials,origins},user:undefined,detail:data});
    }
    async createIndex(req,res){
        const artists = await Artist.find();
        const categories = await Categories.find();
        const characters = await Characters.find();
        const companies = await Companies.find();
        const materials = await Materials.find();
        const origins = await Origins.find();
        res.render('body/create',{data:{artists,categories,characters,companies,materials,origins}, title:'create',user:undefined});
    }
    //  Lưu trữ thông tin 
    async addFigure(req,res){
        let dataImg = [];
        try{   
            const data=req.body;
            for(let ele of req.files){
                const result = await clound.v2.uploader.upload(ele.path,{folder: 'Figure', resource_type: 'image'});
                dataImg.push(result.secure_url)
            }
            data.character = JSON.parse(data.character);
            data.company = JSON.parse(data.company);
            data.artists = JSON.parse(data.artists);
            data.materials = JSON.parse(data.materials);
            data['images'] = dataImg;
            let result = await Figure.create(data);
            console.log(result);
            await res.redirect('/');
        }
        catch(ex){
            console.log(ex.message);
        }
    }
    async editFigure(req,res){
        const figId = req.params.id;
        let dataImg = [];
        
        try{   
            const data=req.body;
            for(let ele of req.files){
                const result = await clound.v2.uploader.upload(ele.path,{folder: 'Figure', resource_type: 'image'});
                dataImg.push(result.secure_url)
            }
            data.character = JSON.parse(data.character);
            data.company = JSON.parse(data.company);
            data.artists = JSON.parse(data.artists);
            data.materials = JSON.parse(data.materials);
           if(dataImg.length>0)  
            data['images'] = dataImg;
            let result = await Figure.findByIdAndUpdate(figId,data);
            console.log(result);
            await res.redirect('/');
        
        }
        catch(ex){
            console.log(ex.message);
        }
    }
}
module.exports = new FigureController;