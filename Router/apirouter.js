const { application } = require('express');
const express = require('express')
var router = express.Router();

router.get('/login', (req, res, next) => {

    res.sendFile(__dirname + '/views/login2.html')
})
router.get('/register', (req, res, next) => {
    res.sendFile(__dirname + '/views/register2.html')
})

module.exports = router