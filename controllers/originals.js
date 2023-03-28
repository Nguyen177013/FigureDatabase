const Figure = require('../models/Figure');
const Origins = require('../models/Origins')
const path = require('path');
const multer  = require('multer');
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


class OrgController{

    async indexOrg (req,res){
        const Original = await Origins.find().populate('name');
        console.log(Original);
        res.render('body/OriginalHome',{data:Original,title:"OriginalHome",user:undefined});
    }
    async OrgDetail(req, res){
        const orgId = req.params.id;
        const data = await Origins.findById(orgId).populate('name');
        let orgID = data._id;
        const figures = await Figure.find({origin: orgID});
        console.log('this is figure: ',figures);
        res.render('body/OriginalDetail',{title:"OriginalDetail",Original:data,user:undefined,figures:figures});
    }
    async orgIndexCreate(req,res){
        res.render('body/OriginalHome',{title:'OriginalHome',user:undefined})
    }
    async addOrg(req,res){
        let data = req.body;
        try{   
        const img = await clound.v2.uploader.upload(req.file.path,{folder: 'Origin', resource_type: 'image'});
        data['image'] = img.secure_url;
        let result = await Origins.create(data);
        console.log(result);
        await res.redirect('/');
        }
        catch(ex){
            console.log(ex.message);
        }
    }

    async editIndexOri(req,res){
        const oriId = req.params.id;
        const origins = await Origins.find();
        const data = await Origins.findById(oriId).populate('name');
        console.log(data);
        res.render('body/editOri',{title:"editOri",data:{origins},user:undefined,detail:data});
    }
   


    async editOrigin(req,res){
        try{
            console.log('hello');
            const orgId = req.params.id;
            const data = req.body;
            if(req.file || req.files){
                const img = await clound.v2.uploader.upload(req.file.path,{folder: 'Origin', resource_type: 'image'});
                data['image'] = img.secure_url;
            }
            await Origins.findByIdAndUpdate(orgId,data);
            await res.redirect('/');
        }
        catch(e){
            console.log(e.message);
        }
    }

    async getOrg(req,res){
        let name = req.params.name;
        // Lấy dữ liệu của công ty theo tên
        let data = await Origins.findById(name);

        // Truy xuất ra công ty theo tên
        res.redirect(`/OriginalDetail/${data._id}`);
    }
}
    module.exports = new OrgController;















