const mongoose = require("mongoose");

const currenciesSchema = new mongoose.Schema({
    currencies: {
        type: Array
    },
})

module.exports = mongoose.model('Currency', currenciesSchema);