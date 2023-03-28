const Account = require('../models/account');
const Posts = require('../models/socialMedia');
const mongoose = require('mongoose');
const handleError = require('../middleware/handleError');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const passport = require('passport');
const cloudinary = require('./cloudinary');
const facebookStrategy = require('passport-facebook').Strategy;
const googleStrategy = require('passport-google-oauth2').Strategy;
const moment = require('moment')
require('dotenv').config();
const createToken = (id) => {
    const maxAge = 3 * 24 * 60 * 60;
    return jwt.sign({ id }, 'Hutech', { expiresIn: maxAge })
}
// Passport session setup. 
passport.serializeUser( async function(user, done) {
        done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  passport.use('facebook',new facebookStrategy({
    clientID: process.env.facebook_api_key,
    clientSecret:process.env.facebook_api_secret ,
    callbackURL: process.env.facebook_callback,
    profileFields:['id','displayName','name','gender','picture.type(large)','email']
},async function(accessToken,refreshToken,profile,done){
        return done(null, profile);
}
));
passport.use('google',new googleStrategy({
    clientID: process.env.google_api_key,
    clientSecret:process.env.google_api_secret ,
    callbackURL: process.env.google_callback,
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
const maxAge = 3 * 24 * 60 * 60;  // 3 ngày
class userController {
    login_get(req, res) {
        res.render('Login/login')
    }
    register_get(rep, res) {
        res.render('Login/register')
    }
    async login_post(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        try {
            const user = await Account.login(username, password);
            const token = createToken(user._id);
            console.log(user);
            console.log('this is token', token);
            res.cookie('user', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).json({ user: user.username });
        }
        catch (ex) {
            let err = handleError(ex);
            res.status(401).json({ err });
        }
    }
    facebookLoggin(req,res,next){
        passport.authenticate('facebook', {failureRedirect: '/signup/login' ,failureMessage: true }, async function (err, user, info){
            let facebookId = user.id
            let facebookName = user.displayName;
            let facebookEmail = user.emails[0].value;
            let facebookImage = user.photos[0].value;
            try{
                let checkFacebookId = await Account.findOne({fId:facebookId});
                if(!checkFacebookId){
                    // console.log({facebookId,facebookEmail,facebookImage,facebookName});
                    const Facebookuser = await Account.create({username:facebookName, email:facebookEmail,password:'thisissecret',image:{img_url:facebookImage,id:'facebook'},fId:facebookId});
                    const token = createToken(user._id);
                    res.cookie('user', token, { httpOnly: true, maxAge: maxAge * 1000 });
                }
                else{
                    const token = createToken(checkFacebookId._id);
                    res.cookie('user', token, { httpOnly: true, maxAge: maxAge * 1000 });
                }
                res.redirect('/');
            }
            catch(ex){
                console.log(ex.message);
            }
        })
        (req, res, next)
    }
    googleLoggin(req,res,next){
        passport.authenticate('google', {failureRedirect: '/signup/login' ,failureMessage: true },
        async function(err, user,info){    
            let googleId = user.id
            let googleName = user.displayName;
            let googleEmail = user.emails[0].value;
            let googleImage = user.photos[0].value;
            try{
                let checkGoogleId = await Account.findOne({fId:googleId});
                if(!checkGoogleId){
                    const googleUser = await Account.create({username:googleName, email:googleEmail,password:'thisissecret',image:{img_url:googleImage,id:'google'},fId:googleId});
                    const token = createToken(googleUser._id);
                    console.log('this is token: ' + token);
                    res.cookie('user', token, { httpOnly: true, maxAge: maxAge * 1000 });
                }
                else{
                    const token = createToken(checkGoogleId._id);
                    res.cookie('user', token, { httpOnly: true, maxAge: maxAge * 1000 });
                }
                res.redirect('/');
            }
            catch(ex){
                let err = handleError(ex);
                res.status(401).redirect('/');;
            }    
        })
        (req, res, next)
    }
    async register_post(req, res) {
        try {
            let data = req.body;
            data['fId'] = req.body.email;
            const user = await Account.create(data);
            res.status(201).json({ user: user._id });
        }
        catch (ex) {
            let err = handleError(ex);
            res.status(401).json({ err });
        }
    }
    sendEmail_get(req, res){
        res.render("Login/sendMail");
    }
   async sendEmail_post(req, res){
        const { email } = req.body;
        try {
          const user = await Account.checkMail(email);
          // // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "ngocsieukibo@gmail.com", // generated ethereal user
              pass: "oclynxhageikuvvm", // generated ethereal password
            },
          });
          const msg = {
            from: '"Wiki_Figure" <ngocsieukibo@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Forgot Password", // Subject line
            // text: "We've receive the request that you've forgotten your password", // plain text body
            html: "<h4>We've receive the request that you've forgotten your password</h4><p>Click here to type the new one</p>", // html body
          };
          await transporter.sendMail(msg, function (err, success) {
            if (err) console.log(err);
            else console.log("Send mail successfully");
            res.status(201).json({user:'Check your mailbox'})
          });
        } catch (ex) {
            let err = handleError(ex);
            res.status(401).json({err});
        }
      };
    async getUser(req,res){
        let userId = req.params.id;
        let [user,figure] = await Promise.all([Account.findById(userId),Posts.find({user:mongoose.Types.ObjectId(userId)}).populate('user').sort({_id:-1})]);
        res.render('SocialMedia/profile',{userd:user,posts:figure,moment:moment});
    }
    async updateUser(req,res){
        try{
        let userId = req.params.id;
        let file = req.file;
        console.log(file.path);
        const user = await Account.findById(userId);
        if(user.image.id){
            await cloudinary.uploader.destroy(user.image.id);
        }
        const image = await cloudinary.v2.uploader.upload(file.path,{folder: "/User_Ava/"});
        await Account.findByIdAndUpdate(userId,{image:{id:image.public_id,img_url:image.secure_url}});
        res.redirect(`/user/${userId}`);
        }catch(ex){
            console.log(ex.message);
        }
    }
    async getUser(req,res){
        
    }
    async logOut(req,res){
        res.cookie('user','',{httpOnly:true,maxAge:1});
        res.redirect('/');
    }
}
module.exports = new userController;
