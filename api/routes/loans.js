const auth = require('../middleware/auth');
const config = require('config');
const db = require('mongoose');
const {Loan} = require('../models/loan');
const { Business } = require('../models/business');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
/*
router.get('/', async (req, res) => {
    await Loan.find({}).then(eachOne => {
        res.json(eachOne);
        })
});
*/

//Loans are now embedded in Business doc 
router.get('/', async (req, res) => {
  let loan = { 
    __v: false,
    merchantId: false, 
    grossMonthlySales: false,
    averageTransactionValue: false
};
  await Business.find({}, loan).then(eachOne => {
    res.json(eachOne);
  })
});

router.get('/:id', async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) return res.status(404).send('Loan application not found.');
  res.send(loan);
});

router.put('/:id', async (req, res) => {
  const loan = await Loan.findByIdAndUpdate(req.params.id, {
      merchantId: req.body.merchantId,
      amount: req.body.amount,
      status: [{
        status: req.body.status
      }],
      documents: req.body.documents
    }
  );
  if (!loan) return res.status(404).send('Loan application not found.');

  res.send(loan);
});

module.exports = router;