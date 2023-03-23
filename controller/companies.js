const Figure = require('../models/Figure');
const path = require('path');
const multer  = require('multer');
const Companies = require('../models/Companys');
const clound = require('../cloudinary')

class ComController{

    async indexCom (req,res){
        const companies = await Companies.find().populate('name');
        console.log(companies);
        res.render('body/CompaniesHome',{data:companies,title:"CompaniesHome",user:undefined});
    }
    async comDetail(req, res){
        const comId = req.params.id;
        const data = await Companies.findById(comId).populate('name')
        .populate('Homepage');
        // Lấy Id của Company
        let compID = data._id;

        // Lọc những figures có chứa thông tin ID của công ty ấy

        const figures = await Figure.find({company: compID});
        const companies = await Companies.find();
        
        console.log('this is figure: ',figures);
        // figures:figures dùng để lấy thông tin của các figure trong comapy theo mã ID trên
        res.render('body/CompaniesDetail',{title:"CompaniesDetail",data:{companies},user:undefined, figures:figures,detail:data});
        // Qua view CompaniesDetail.ejs 
    }
    async comIndexCreate(req,res){
        res.render('body/createCom',{title:'createCom',user:undefined})
    }
    async addCom(req,res){
        const data = req.body;
        try{   
        const img = await clound.v2.uploader.upload(req.file.path,{folder: 'Companies', resource_type: 'image'});
        data['image'] = img.secure_url;
        let result = await Companies.create(data);
        await res.redirect('/');
        }
        catch(ex){
            console.log(ex.message);
        }
    }
    async editIndexCom(req,res){
        const comId = req.params.id;
        const companies = await Companies.find();
        const data = await Companies.findById(comId).populate('name')
        .populate('Homepage');
        console.log(data);
        res.render('body/editCom',{title:"editCom",data:{companies},user:undefined,detail:data});
    }
    async editCom(req,res){
        const comId = req.params.id;
        const data = req.body;
        if(req.file || req.files){
            const img = await clound.v2.uploader.upload(req.file.path,{folder: 'Artists', resource_type: 'image'});
            data['image'] = img.secure_url;
        }
        await Companies.findByIdAndUpdate(comId,data);
        await res.redirect('/');
    }
    // Lấy thông tin Company
    async getComp(req,res){
        let name = req.params.name;
        // Lấy dữ liệu của công ty theo tên
        let data = await Companies.find({name:name});

        // Truy xuất ra công ty theo tên
        res.redirect(`/CompaniesDetail/${data[0]._id}`);
    }
}
    module.exports = new ComController;















