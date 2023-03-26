const payment = require('../controllers/payment');
const router = require('express').Router();
const {requireAuth} = require('../middleware/authorization');
router.get('/momo',requireAuth,payment.getMomo);
router.get('/momo_callBack',payment.momo_callBack);
module.exports = router
