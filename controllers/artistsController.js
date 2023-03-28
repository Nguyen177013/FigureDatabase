const Artists = require('../models/artists');
const clound = require('../cloudinary')
class ArtistsController{
    async index(req,res,next){
        const data = await Artists.find();
        res.json(data);
    }
    async addArtsit(req,res,next){
        try{
            const data = req.body;
            const img = await clound.v2.uploader.upload(req.file.path,{folder: 'Artists', resource_type: 'image'});
            data['image'] = img.secure_url;
            await Artists.create(data);
            await res.redirect('/');
        }
        catch(e){
            console.log(e.message);
        }
    }

}
module.exports = new ArtistsController;