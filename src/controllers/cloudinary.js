const cloudinary = require('cloudinary');
try{

  cloudinary.config({ 
    cloud_name: 'dfikygdlo', 
    api_key: '824124961762762', 
    api_secret: 'pzcEGbPUjogDpagHUEYK0dj1fio' 
  });
}
catch(ex){
  console.log(ex.message);
}
module.exports = cloudinary;