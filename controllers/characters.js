const Characters = require('../models/Characters');
const Origins = require('../models/Origins');
const Figure = require('../models/Figure');
const multer  = require('multer');
const path = require('path');
const clound = require('../cloudinary')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname, '..','public',"img",'mona'))
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
    class CharactersController{
        async indexChar (req,res){
            const characters = await Characters.find().populate('name');
            const origins = await Origins.find();
            console.log(characters);
            res.render('body/charactersHome',{data:characters,title:"charactersHome",user:undefined,origins:origins});
        }
        async charDetail(req, res){
            const charId = req.params.id;
            const characters = await Characters.find();
            const data = await Characters.findById(charId).populate('name')
            .populate('original').populate('origin');
            let charID = data._id;
            const figures = await Figure.find({character: charID});
            const origins = await Origins.find();
            res.render('body/charactersDetail',{title:"charactersDetail",characters:data,user:undefined,figures:figures,data:{characters,origins}});
        }
        async createCharIndex(req,res){
            const origins = await Origins.find();
            
            res.render('body/createChar',{data:{origins}, title:'createChar',user:undefined});
        }

        async editIndexChar(req,res){
            const charId = req.params.id;
            const characters = await Characters.find();
            const origins = await Origins.find();
            const data = await Characters.findById(charId).populate('name')
            .populate('original').populate('origin');
            console.log(data);
            res.render('body/editChar',{title:"editChar",data:{characters,origins},user:undefined,detail:data});
        }

        async editChar(req,res){
            const charId = req.params.id;
            const data = req.body;
            if(req.file || req.files){
                const img = await clound.v2.uploader.upload(req.file.path,{folder: 'Character', resource_type: 'image'});
                data['image'] = img.secure_url;
            }
            await Characters.findByIdAndUpdate(charId,data);
            await res.redirect('/');
        }
        
        async addChar(req,res){
            try{   
            const data = req.body;
            const img = await clound.v2.uploader.upload(req.file.path,{folder: 'Character', resource_type: 'image'});
            data['image'] = img.secure_url;
            await Characters.create(data);
            res.redirect('/');
            }
            catch(ex){
                console.log(ex.message);
            }
        }
        async getChar(req,res){
            let name = req.params.name;
         
            let data = await Characters.find({name:name});
    
            
            res.redirect(`/charactersDetail/${data[0]._id}`); //đang lỗi// ???????????
        }
    }
module.exports = new CharactersController