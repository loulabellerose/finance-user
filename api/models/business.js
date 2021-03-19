const config = require('config');
const db = require('mongoose');
const {loanSchema} = require('./loan');

const businessSchema = new db.Schema({
  merchantId: {
    type: String,
    //required: true
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
  },
  pushToken: {
      type:  String
  },
  loan: {
    type: loanSchema
  }
});

const Business = db.model('Business', businessSchema);

module.exports.Business = Business;
module.exports.businessSchema = businessSchema;