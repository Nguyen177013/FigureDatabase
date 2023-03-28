const Account = require('../models/account');
const Post = require('../models/socialMedia');
const Character = require('../models/Characters');
const cloudinary = require('./cloudinary');
const message = require('../models/message');
const purchage = require('../models/purchage');
class postController {
    async index(req, res) {
        let [charData, posts] = await Promise.all([Character.find(), Post.find().populate('user').sort({ _id: -1 })]);
        res.render('SocialMedia/index', { characters: charData, posts: posts });
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
            let result = await Post.create(data);
            res.redirect('/figure-wiki');
        }
        catch (ex) {
            console.log(ex.message);
        }
    }
    async remove(req, res) {
        try {
            let postId = req.body.postId;
            let post = await Post.findOne({ _id: postId });
            post.remove();
            res.json({ success: true })
        }
        catch (ex) {
            console.log(ex.message);
        }
    }
    async findpost(req, res) {
        try {
            let search = req.body.name;
            if (search) {
                const find = await Post.find({ title: { '$regex': search, $options: 'is' } }).populate('user');
                res.json({ posts: find });
            }
            else
                res.json({ posts: '' });
        }
        catch (e) {
            console.log(e.message);
        }
    }
}
module.exports = new postController;