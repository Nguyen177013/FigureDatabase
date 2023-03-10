const Figure = require('../models/Figure');
class FigureController {
    async index(req, res) {
        try {
            const figures = Figure.find();

            res.json({ figures: figures});
        }
        catch (ex) {
            console.log(ex.message);
        }
    }
}

module.exports = new FigureController;