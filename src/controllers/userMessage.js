const Account = require('../models/account');
// const Post = require('../models/socialMedia');
// const Character = require('../models/Characters');
// const cloudinary = require('./cloudinary');
const Message = require('../models/message');
const listMessage = require('../models/messageList');
class messageController{
    async message_get(req,res){  
        let userSend = res.locals.user.id;
        let listMess = await listMessage.getChatList(userSend);
        res.render('SocialMedia/message',{list:listMess});
    }
    async sendmessage_get(req,res){  
        let userId = req.params.id;
        let userSend = res.locals.user.id;
        let listMess = await listMessage.getChatList(userSend);
        let messageSend = await Message.getSpecificChat(userSend,userId);
        let currUser = await Account.findById(userId)
        res.render('SocialMedia/messageb',{users:listMess,userChat:currUser,messageSend:messageSend});
    }
    async getMessageByIdGet(id){
        let list = await Message.find({userGet:id});
        return list;
    }
    async addListMessage(req,res){
        try{
            let {userSend,userGet} = req.body;
            console.log({userSend,userGet});
            let check = await listMessage.findOne({userSend,userGet});
            if(!check || check == null){
                let user = await listMessage.create({userSend,userGet});
                res.json({success:user.userGet});
                return;
            }
            res.json({success:check.userGet});
        }
        catch(ex){
            res.json({err:ex.message});
        }
    }
    async addMessage(req,res){
        let {userSend,userGet,message} = req.body;
        console.log({userSend,userGet,message});
        try{
            let data = {
                userGet: userGet,
                userSend:userSend,
                message:message,
            };
            await Message.create(data);
            res.json({success:1});
        }
        catch(ex){
            res.json(undefined);
        }
    }
}
module.exports = new messageController;