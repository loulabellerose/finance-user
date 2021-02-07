const config = require('config');
const db = require('mongoose');
//const {businessSchema} = require('./business');

const merchantSchema = new db.Schema({
   accountHolderName: {
       type: String,
       required: [true, 'Name is a required field'],
       minlength: 5,
       maxlength: 50
     },
     email: {
       type: String,
       required: [true, 'Email is a required field'],
       minlength: 5,
       maxlength: 255,
       unique: true
     },
     password: {
       type: String,
       required: [true, 'Password is a required field'],
       minlength: 5,
       maxlength: 1024
     },
     phone: {
       type: String,
       required: [true, 'Phone is a required field'],
       minlength: 10,
       maxlength: 20
     },
     postalAddress: {
      type: String,
      required: [true, 'Address is a required field'],
      minlength: 5,
      maxlength: 255
    },
    /* Can get this info from object ID
    merchantSince: {
      type: Date,
      // Timestamp of first insertion into db?
      required: true
    },
    //removing business as subdoc
    business: {
      type: businessSchema
    }
    */
});


const Merchant = db.model('Merchant', merchantSchema);

exports.Merchant = Merchant;
exports.merchantSchema = merchantSchema;
