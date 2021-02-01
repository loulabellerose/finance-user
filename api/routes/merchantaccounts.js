const express = require('express');
const db = require('mongoose');
const {MerchantAccount} = require('../models/merchantaccount');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const account = await MerchantAccount.findById(req.params.id);
  //check parameter for account id
  if (!account) return res.status(404).send('Merchant account not found.');
  res.send(account);
});

module.exports = router;