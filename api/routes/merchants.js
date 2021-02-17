const express = require('express');
const db = require('mongoose');
const {Merchant} = require('../models/merchant');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  await Merchant.find({}).then(eachOne => {
      res.json(eachOne);
      })
});

router.get('/:id', auth, async (req, res) => {
  const merchant = await Merchant.findById(req.params.id);
  //check parameter for account id
  if (!account) return res.status(404).send('Merchant account not found.');
  res.send(merchant);
});

router.post('/new', auth, async (req, res) => {
  let merchant = new Merchant(req.body, [
    'accountHolderName', 'email', 'password', 'phone', 'postalAddress'
  ]);
  merchant.password = await bcryptjs.hash(merchant.password, 10);
  await merchant.save();

  res.send(merchant);
});

module.exports = router;