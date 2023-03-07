const character = require('../models/Characters');
class characterController{
    async character_index(req,res){
        const characters = await character.find();
        res.json({characters: characters});
    }
    async Character_get(req,res){
        const charId = req.params.id;
        const detail = await character.findById(charId);
        res.json({character:detail});
    }
}
module.exports = new characterController;