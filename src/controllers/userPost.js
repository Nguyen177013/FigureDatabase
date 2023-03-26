const Post = require('../models/userpost');
const Character = require('../models/Characters');
const cloudinary = require('./cloudinary');
const message = require('../models/message');
const favoratePost = require('../models/postFavorate');
const mongoose = require('mongoose');
const purchage = require('../models/purchage');
const postFavorate = require('../models/postFavorate');
const listComment = require('../models/commentPost');
const { postsComment } = require('./comment');
class postController {
    async index(req, res) {
        let userId = res.locals.user.id;
        let [charData, posts, check, dataNum] = await Promise.all([Character.find(), Post.find().populate('user').sort({ _id: -1 }), purchage.findUser(userId), postFavorate.totalFavorate()]);
        for(let ele of posts) {
            dataNum.some(value => {
                if (value._id == ele.id) {
                    ele['favorate'] = value.count;
                }
            });
            ele['comments'] = await listComment.find({post:ele.id}).limit(5).populate('user');
        }
        res.render('SocialMedia/index', { characters: charData, posts: posts, check, dataNum: dataNum });
    }
    async post(req, res) {
        let { body, origin, Character, privacy } = req.body;
        let dataImg = [];
        try {
            let userId = req.data.id
            let data = { user: userId, origin: origin, character: Character, title: body, privacy };
            for (let ele of req.files) {
                const result = await cloudinary.v2.uploader.upload(ele.path, { folder: `/User_Figures/${userId}` });
                dataImg.push({ url: result.secure_url, id: result.public_id });
            }
            if (dataImg.length > 0)
                data['images'] = dataImg;
            await Post.create(data);
            res.redirect('/figure-wiki');
        }
        catch (ex) {
            res.redirect('/figure-wiki'); 
        }
    }
    async remove(req, res) {
        try {
            let postId = req.body.postId;
            await favoratePost.deleteMany({post:postId});
            let post = await Post.findOne({ _id: postId });
            post.remove();
            await listComment.deleteMany({post: postId});
            res.json({ success: true })
        }
        catch (ex) {
            console.log(ex.message);
        }
    }
    async listFavorate(req,res){
        let userId = res.locals.user.id;
        let [data,dataNum] = await Promise.all([favoratePost.find({ user: mongoose.Types.ObjectId(userId)}).populate({path:'post',populate:{path:'user'}}),postFavorate.totalFavorate()]);
        for(let ele of data) {
            dataNum.some(value => {
                if (value._id == ele.id) {
                    ele['favorate'] = value.count;
                }
            });
            let comments = await listComment.find({post:ele.post.id}).limit(5).populate('user');
            if(comments.length > 0) {
                    ele['comments'] = comments;
                }
            }
            console.log('this is data: ',data[0]);
        res.render('SocialMedia/favorate', {posts: data, dataNum: dataNum });
    }
}
module.exports = new postController;