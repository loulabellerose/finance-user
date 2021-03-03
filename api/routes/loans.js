const auth = require('../middleware/auth');
const config = require('config');
const db = require('mongoose');
const { Loan } = require('../models/loan');
const { Business } = require('../models/business');
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const router = express.Router();
//const multer = require('multer');
var clone = require('clone');

router.get('/', auth, async (req, res) => {
  await Loan.find({}).then(eachOne => {
    res.json(eachOne);
  })
});

router.get('/:id', auth, async (req, res) => {
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
    //documents: ""

  }

  if (!business) return res.status(404).send('Loan application not found.');

  const success = await business.save();
  res.send(success);
});

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