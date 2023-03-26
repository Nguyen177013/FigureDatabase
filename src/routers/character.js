const express = require('express');
const router = express.Router();
const character = require('../controllers/character');

router.get('/',character.character_index);
router.get('/:id',character.Character_get);
router.get('/fig/:id',character.getCharbyOrg);
module.exports  = router;