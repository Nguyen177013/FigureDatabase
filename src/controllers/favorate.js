const Favorate = require('../models/favorate');
const mongoose = require('mongoose');
const favoratePost = require('../models/postFavorate');
class favorateController {
    async totalFavorate(id) {
        let figureId = id;
        return await Favorate.find({ figure: figureId }).count();
    }
    async getFavorate(id) {
        let figureId = id;
        return await Favorate.find({ figure: figureId });
    }
    async checkUser(userId, figId) {
        let user = userId;
        let fig = figId;
        return await Favorate.findOne({ user: mongoose.Types.ObjectId(user), figure: mongoose.Types.ObjectId(fig) });
    }
    async addFavorate(req, res) {
        let { figId, user } = req.body;
        let check = await Favorate.find({ $and: [{ user: user }, { figure: figId }] });
        if (check.length < 1) {
            await Favorate.create({ user: user, figure: figId });
            res.json({ add: 1 });
        }
        else {
            await Favorate.deleteOne({ user: user, figure: figId })
            res.json({ remove: 1 });
        }
    }
    async postFavorate(req,res){
        try{
            let {userId,postId} =req.body;
            let check = await favoratePost.findOne({ $and: [{ user: userId }, { post: postId }] });
            if(check){
                await favoratePost.deleteOne({post:postId,user:userId});
                res.json({delete:1});
                return;                
            }
            await favoratePost.create({post:postId,user:userId});
            res.json({success:1});
            return;
        }
        catch(ex){
            console.log(ex.message);
            res.json({fail:1});
        }
    }
    async orderFavorate(req,res){
        
    }
}
module.exports = new favorateController;