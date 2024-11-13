const mongoose = require("mongoose");

const loansSchema = new mongoose.Schema({
    loan_name: {
        type: String,
        required: 'name is required'
    },
    loan_amount: {
        USD: {
            type: Number,
            required: 'loan amount is required',
        },
        GBP: {
            type: Number,
            required: 'loan amount is required',
        },
        original_currency: {
            currency: {
                type: String,
                required: 'loan currency is required',
            },
            amount: {
                type: Number,
                required: 'loan amount is required',
            }
        }
    },
    loan_term: {
        type: String,
        required: 'loan term is required'
    }

})

module.exports = mongoose.model('Loan', loansSchema);