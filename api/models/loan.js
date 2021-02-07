//const config = require('config');
const { Double } = require('mongodb');
const db = require('mongoose');
const {statusSchema} = require('./status');

const loanSchema = new db.Schema ({
    merchantBusinessId: {
        type: String
    },
    amount: {
        //Add validation to ensure proper monetary value
        type: Number,
        min: 1000.00,
        max: 10000.00
    },
    status: {
        type: [statusSchema]
    },
    documents: {
        type: String,
        minlength: 5
    }
});

const Loan = db.model('Loan', loanSchema);

exports.Loan = Loan;
exports.loanSchema = loanSchema;