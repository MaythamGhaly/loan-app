const { Router } = require('express');
const router = Router();
const { addLoan, getLoans } = require('../controllers/loans.controller');
const { addCurrencies } = require('../controllers/currencies.controller');

router.post('/loan', addLoan);
router.get('/loan', getLoans);
router.get('/addcurrencies',addCurrencies);
router.get('/getcurrencies',addCurrencies);


module.exports = router;