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

class ArtController{

    async indexArt (req,res){
        const artists = await Artists.find().populate('name');
        const artId = req.params.id;
        const data = await Artists.findById(artId).populate('name')
        .populate('Homepage');
        console.log(artists);
        res.render('body/artistsHome',{artists:artists,title:"artistsHome",user:undefined,data:{artists},art:data});
    }
    async artDetail(req, res){
        const artId = req.params.id;
        const artists = await Artist.find();
        const data = await Artists.findById(artId).populate('name')
        .populate('Homepage');
        let artID = data._id;
        console.log(data);
        const figures = await Figure.find({artists: artID});
        // console.log('this is figure: ',figures);
        res.render('body/artistsDetail',{title:"artistsDetail",detail:data,user:undefined,figures:figures,data:{artists}});
    }
    async editIndexArt(req,res){
        const artId = req.params.id;
        const artists = await Artist.find();
        const data = await Artists.findById(artId).populate('name')
        .populate('Homepage');
        console.log(data);
        res.render('body/editArt',{title:"editArt",data:{artists},user:undefined,detail:data});
    }
    async artIndexCreate(req,res){
        res.render('body/createArt',{title:'createArt',user:undefined})
    }
    async editArtist(req,res){
        try{
            const artId = req.params.id;
            const data = req.body;
            if(req.file || req.files){
                const img = await clound.v2.uploader.upload(req.file.path,{folder: 'Artists', resource_type: 'image'});
                data['image'] = img.secure_url;
            }
            await Artists.findByIdAndUpdate(artId,data);
            await res.redirect('/');
        }
        catch(e){
            console.log(e.message);
        }
    }


    async getArt(req,res){
        let name = req.params.name;
        // Lấy dữ liệu của công ty theo tên
        let data = await Artists.find({name:name});

        // Truy xuất ra công ty theo tên
        res.redirect(`/artistsDetail/${data[0]._id}`);
    }
}
    module.exports = new ArtController;















