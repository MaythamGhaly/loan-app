// const User = require('../models/users.model');
const Loan = require('../models/loans.model');
const axios = require('axios');
// const Favorite = require('../models/favorites.model');
// const Chat = require('../models/chats.model');
// const bcrypt = require('bcrypt');

const fetchCurrencyData = async () => {
    const url = process.env.CURRENCY_API_URL;
    const apiKey = process.env.CURRENCY_API_KEY;

    try {
        const response = await axios.get(`${url}?apikey=${apiKey}`);
        // console.log('Currency Data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching currency data:', error.message);
        throw error;
    }
};

const addLoan = async (req, res) => {
    try {
        console.log(req.file);
        const { loan_name, amount, loan_term, currency } = req.body;
        const currencies = await fetchCurrencyData();
        const usd_amount = amount / currencies.data[currency].value;
        const gbp_amount = usd_amount * currencies.data['GBP'].value;
        loan_amount = {
            USD: usd_amount,
            GBP: gbp_amount,
            original_currency: {
                currency: currency,
                amount: amount
            }
        }
        const loan = await Loan.create({
            loan_name,
            loan_amount,
            loan_term,
            currency
        });
        await loan.save();

        const loans = await Loan.find();

        return res.send(loans);
    } catch (error) {
        console.error('Error adding loan:', error);
        return res.status(500).send({ error: error.message || 'An error occurred while adding the loan' });
    }
}


const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find();

        return res.send(loans);
    } catch (error) {
        console.error('Error getting loans:', error);
        return res.status(500).send({ error: error.message || 'An error occurred while getting the loans' });
    }
}


module.exports = {
    addLoan,
    getLoans
}