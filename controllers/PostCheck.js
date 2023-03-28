const social = require('../models/socialMedia');
const Accounts = require('../models/account');

class postController{
    async indexPost(req,res){
        const userId = req.params.id;
        const Social = await social.find().populate('user').sort({ _id: -1 });
        const data = await social.find().sort({ _id: -1 });
        const statistics = await social.find({Social: userId}).populate('user').sort({_id:-1});
        res.render('body/PostCheck',{title:"PostCheck",detail:data,user:undefined,statistics:statistics,data:{Social}});
    }

    async remove(req,res){
        try{
            let postId = req.body.postId;
            let post = await social.findOne({_id:postId});
            post.remove();
            res.json({success:true})
        }
        catch(ex){
            console.log(ex.message);
        }
    }
}

module.exports = new postController;