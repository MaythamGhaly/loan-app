const { Router } = require('express');
// const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();
const { addLoan, getLoans } = require('../controllers/user.controller');
// user routes
router.post('/loan', addLoan);
router.get('/loan', getLoans);


module.exports = router;