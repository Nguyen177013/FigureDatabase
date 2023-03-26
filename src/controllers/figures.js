const Figure = require('../models/Figure');
const Views = require('../models/userView');
const favorateController = require('./favorate');
const favorate = require("../models/favorate");
const Comment = require('../controllers/comment');
const Post = require('../models/userpost');
const User = require('../models/account');
const thisDate = new Date();
class FigureController {
    async index(req, res) {
        try {
            let userId = res.locals.user;
            let recommends = [];
            if (userId) {
                recommends = await favorate.recommendation(userId.id);
            }
            let thisMonth = thisDate.getMonth() + 1;
            let thisYear = thisDate.getFullYear();
            const latest = Figure.find().populate('category').populate('artists').populate('character').sort({ _id: -1 }).limit(6);
            let [late, topView, month] = await Promise.all([latest, Views.sortView(), Figure.getByMonth(thisMonth, thisYear, 0, 6)]);

            res.render('Home/index', { figures: late, months: month, views: topView, recommends: recommends });
        }
        catch (ex) {
            console.log(ex.message);
        }
    }
    async latest_fig(req, res) {
        const figPerPage = 15;
        const length = await Figure.find().count();
        const page = req.params.p - 1;
        const latest = await Figure.find().populate('category').populate('artists').populate('character')
            .sort({ _id: -1 }).skip(figPerPage * page).limit(figPerPage);
        res.render('Figure/latest', { length, page, latest: latest });
    }
    async figThismonth(req, res) {
        let thisMonth = thisDate.getMonth() + 1;
        let thisYear = thisDate.getFullYear();
        const page = req.params.p - 1;
        const limit = 15;
        let length = await Figure.getByMonth(thisMonth, thisYear, 0, 0);
        let data = await Figure.getByMonth(thisMonth, thisYear, page, limit);
        res.render('Figure/months', { length: length.length, page, latest: data });
    }
    async topview(req, res) {
        const page = req.params.p - 1;
        const limit = 15;
        const data = await Views.sortView(page, limit);
        const length = await Views.sortView(0, 0);
        res.render('Figure/fires', { length: length.length, page, latest: data });
    }
    async figure_detail(req, res) {
        const fig_id = req.params.id;
        let userId = res?.locals?.user?.id;
        const figure = Figure.findById(fig_id).populate('category')
            .populate('artists').populate('character')
            .populate('origin').populate('company').populate('materials');
        const views = Views.find({ figure: fig_id }).count();
        const total = favorateController.totalFavorate(fig_id);
        let comments = Comment.getAllComment(fig_id);
        let check = favorateController.checkUser(userId, fig_id);
        let involve = Post.find({ character: fig_id });
        const [a, b, c, d, e, f] = await Promise.all([figure, views, total, comments, check, involve]);
        let displayPost = [];
        f.map(ele => {
            return displayPost.push(ele.images[0].url);
        })
        res.render('Home/detail', { title: "detail", figure: a, views: b, favorate: c, comments: d, check: e, displayPost });
    }
    async itemFigure(req, res) {
        const figure = await Figure.find();
        res.render('Figure/items', { figures: figure, status: 'fire' });
    }
    async findFigure(req, res) {
        let searchName = req.query.name;
        const figure = await Figure.find({ name: { '$regex': searchName, $options: 'is' } });
        res.render('Figure/find', { name: searchName, figures: figure });
    }
    async userFavorate(req,res){
        const page = req.params.p - 1;
        let userId = res.locals.user.id;
        const listfavorate = await favorate.find({user:userId}).populate('figure');;
        const length = listfavorate.length;
        console.log(listfavorate);
        res.render('Figure/favorate', { length: length, page, latest: listfavorate });
    }
    async findNav(req, res) {
        try {
            let searchName = req.body.name;
            if (searchName) {
                const [figure,user] = await Promise.all([Figure.find({ name: { '$regex': searchName, $options: 'is' } }).populate('origin'),User.find({username:{'$regex': searchName, $options: 'is' }})]);
                if (figure.length>0) {
                    res.json({ figures: figure });
                }
                if(user.length>0) {
                    res.json({ user: user });
                }
            }
            else
                res.json({ figures: '' });
        }
        catch (e) {
            console.log(e.message);
        }
    }
}

module.exports = new FigureController;