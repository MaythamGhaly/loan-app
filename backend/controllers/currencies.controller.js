const Currencies = require("../models/currencies.model")
const axios = require('axios');

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
// Function to add all currencies if they haven't been added before 
// (when you run the project for the first time, the currencies are added to be used in the dropdown on the frontend).
const addCurrencies = async (req, res) => {
    try {
        const get_currencies = await Currencies.find();
        if (!get_currencies.length) {
            const currencies = await fetchCurrencyData();
            const codes = [];

            Object.values(currencies.data).forEach(currency => {
                codes.push(currency.code);
            });
            const currency = new Currencies({
                currencies: codes
            });
            await currency.save();

            return res.send(codes);
        }
        return res.send(get_currencies);
    } catch (error) {
        console.error('Error adding currencies:', error);
        return res.status(500).send({ error: error.message || 'An error occurred while adding curencies' });
    }
}
// function to get all currencies
const getCurrencies = async (req, res) => {
    try {
        const currencies = await Currencies.find();

        return res.send(currencies);
    } catch (error) {
        console.error('Error getting Currencies:', error);
        return res.status(500).send({ error: error.message || 'An error occurred while getting Currencies' });
    }
}

module.exports = {
    addCurrencies,
    getCurrencies
}