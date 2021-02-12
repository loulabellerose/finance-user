const auth = require('../middleware/auth');
const config = require('config');
const db = require('mongoose');
const { Loan } = require('../models/loan');
const { Business } = require('../models/business');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
var clone = require('clone');

router.get('/', async (req, res) => {
  await Loan.find({}).then(eachOne => {
    res.json(eachOne);
  })
});

router.get('/:id', async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if (!loan) return res.status(404).send('Loan application not found.');
  res.send(loan);
});

//Posting a new loan is done by adding it to an existing business document
router.post('/new', async (req, res) => {
  const business = await Business.findById(req.body.businessId);
  business.loan = {
    amount: req.body.amount,
  
    status: [{
      currentStatus: "Submitted by Merchant"
    }],
    documents: ""
    
  }

  if (!business) return res.status(404).send('Loan application not found.');

  const success = await business.save();
  res.send(success);
});

/*
router.post('/new', async (req, res) => {
  const loan = new Loan(req.body, [
    'businessId', 'amount'
  ]);
  await loan.save();

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

router.put('/:id', async (req, res) => {
  const loan = await Loan.findByIdAndUpdate(req.params.id, {
    $push: { status: req.body.status }
  });

  if (!loan) return res.status(404).send('Loan application not found.');

  await loan.save()
    .then(res.send(loan));

});
*/

//Updating the status of an existing loan is done by inserting a new status object into the loan's status array
router.post('/:id', async (req, res) => {
  const business = await Business.findById(req.params.id);
  
  const statusUpdate = { 
    status: {
      currentStatus: req.body.currentStatus 
    }
  };
  
  console.log(statusUpdate);
  business.loan.status.push(statusUpdate.status);
  if (!business) return res.status(404).send('Biz not found.');

  const success = await business.save();
  res.send(success);
});

module.exports = router;