const express = require('express');
const db = require('mongoose');
const {MerchantBusiness} = require('../models/merchantbusiness');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const business = await MerchantBusiness.findById(req.params.id);
  //check parameter for business id
  if (!business) return res.status(404).send('Merchant business not found.');
  res.send(business);
});

module.exports = router;