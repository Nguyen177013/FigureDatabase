const multer = require('multer');
const path = require('path');
    let a = multer({
        storage:multer.diskStorage({}),
        fileFilter:(req,file,cb)=>{
            let ext = path.extname(file.originalname);
            if(ext !==".jpg" && ext !==".jpeg" && ext !==".png"&& ext !==".PNG"&& ext !==".jfif" ){
                cb(null,false);
                return;
            }
            cb(null,true);
        },
    })
module.exports = a;