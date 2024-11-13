const Loan = require('../models/loans.model');
const Currencies = require("../models/currencies.model")
const axios = require('axios');
const mongoose = require('mongoose');

// function to fetvh Currencies
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

// funtion to add loan
const addLoan = async (req, res) => {
    try {
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

const deleteLoan = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ error: 'Invalid loan ID format' });
        }

        const loan = await Loan.findByIdAndDelete(id);
        if (!loan) {
            return res.status(404).send({ error: 'Loan not found' });
        }

        return res.send({ success: 'Loan successfully deleted' });
    } catch (error) {
        console.error('Error deleting loan:', error);
        return res.status(500).send({ error: error.message || 'An error occurred while deleting the loan' });
    }
};

// function to get all loans
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
    getLoans,
    deleteLoan
}