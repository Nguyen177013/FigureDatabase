const Comment  = require('../models/commentFig');
const Account = require('../models/account');

let addCommentFig = async (user,figure,title)=>{
        let comment = await (await Comment.create({user,figure,title})).populate('user');
        return comment;
}
module.exports ={
    addCommentFig
}