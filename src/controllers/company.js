const company = require('../models/Companys');

class companyController{
    async containCompanies(arr,result){
        arr.forEach(com=>{
            if(result.indexOf(com) == -1){
                result.push(com);
            }
        })
        return result;
    }
}
module.exports = new companyController