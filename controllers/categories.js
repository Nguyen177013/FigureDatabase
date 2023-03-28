const Figure = require('../models/Figure');
const Artist = require('../models/artists');
const Categories = require('../models/Categories');
const Characters = require('../models/Characters');
const Companies = require('../models/Companys');
const Materials = require('../models/materials');
const Origins = require('../models/Origins')
const path = require('path');
const multer  = require('multer');
const Artists = require('../models/artists');
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


class CateController{

    async indexCate (req,res){
        const category = await Categories.find().populate('name');
        console.log(category);
        res.render('body/categoryHome',{data:category,title:"categoryHome",user:undefined});
    }
    async cateDetail(req, res){
        const cateId = req.params.id;
        const data = await Categories.findById(cateId).populate('name');
        let cateID = data._id;
        const figures = await Figure.find({category: cateID});
        console.log('this is figure: ',figures);
        res.render('body/categoryDetail',{title:"categoryDetail",category:data,user:undefined,figures:figures});
    }
    async cateIndexCreate(req,res){
        res.render('body/createCate',{title:'createCate',user:undefined})
    }
    async addCate(req,res){
        let dataImg = [];
        try{   
            upload(req,res,async function(err){
            if (err) {
                console.log("lỗi lặt vặt");
                res.status(500).json({error: 'Dung lượng tối đa là 25MB'}); 
            }
            const data = req.body;
            req.files.forEach(file=>{
                dataImg.push(file.filename);
            })
            data['images'] = dataImg;
            let result = await Categories.create(data);
            console.log(result);
            await res.redirect('/');
        })
        }
        catch(ex){
            console.log(ex.message);
        }
    }
    async getCate(req,res){
        let name = req.params.name;
        // Lấy dữ liệu của công ty theo tên
        let data = await Categories.findById(name);

        // Truy xuất ra công ty theo tên
        res.redirect(`/categoryDetail/${data._id}`);
    }
}
    module.exports = new CateController;















