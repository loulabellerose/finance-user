const express = require('express');
const db = require('mongoose');
const { Business } = require('../models/business');
//const { Merchant } = require('../models/merchant');
const router = express.Router();

router.get('/', async (req, res) => {
  await Business.find({}).then(eachOne => {
    res.json(eachOne);
  })
});

router.get('/:id', async (req, res) => {
  const business = await Business.findById(req.params.id);
  //check parameter for business id
  if (!business) return res.status(404).send('Business not found.');
  res.send(business);
});

router.post('/new', async (req, res) => {
  const business = new Business(req.body, [
    'merchantId', 'businessName', 'grossMonthlySales', 'averageTransactionValue'
  ]);
  await business.save();

  res.send(business);
});

//Finds business by ID and inserts loan
router.put('/:id', async (req, res) => {

  const business = await Business.findByIdAndUpdate(req.params.id, {
    loan : {
      amount: req.body.amount,
      
    }
  }
  );
  if (!business) return res.status(404).send('Business not found.');

  res.send(business);
});

module.exports = router;