const config = require('config');
const db = require('mongoose');

const merchantBusinessSchema = new db.Schema({
    merchantAccountId: {
        type: String,
        required: [true, 'AccountId is required'],
    },
   businessName: {
       type: String,
       required: [true, 'Business name is a required field'],
       minlength: 1,
       maxlength: 50
     },
    grossMonthlySales: {
        type: Number
    },
    averageTransactionValue: {
        type: Number
    }
     
});

const MerchantBusiness = db.model('MerchantBusiness', merchantBusinessSchema);

exports.MerchantBusiness = MerchantBusiness;