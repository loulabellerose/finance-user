//const config = require('config');
const db = require('mongoose');
const {statusSchema} = require('./status');

const loanSchema = new db.Schema ({
    merchantId: {
        type: String,
        required: [true, 'MerchantID is required'],
    },
    amount: {
        //how best to handle monetary values
        //how to set a min and max
        type: Number,
        min: 1000,
        max: 10000
    },
    status: {
        //type: statusSchema,
        type: String,
        required: true
      },
    documents: {
        type: String,
        minlength: 5
    }
});

const Loan = db.model('Loan', loanSchema);

exports.Loan = Loan;
