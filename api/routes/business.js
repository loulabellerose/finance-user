const express = require('express');
const db = require('mongoose');
const { Business } = require('../models/business');
const { route } = require('./users');
//const { Merchant } = require('../models/merchant');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  await Business.find({}).then(eachOne => {
    res.json(eachOne);
  })
});

router.get('/:id', async (req, res) => {
  if (!db.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Invalid ID');
  const business = await Business.findById(req.params.id);
  //check parameter for business id
  if (!business) return res.status(404).send('Business not found.');
  res.send(business);
});
//this end point is not used in the working application however was used to
//populate the DB with appropriate validation
router.post('/new', auth, async (req, res) => {
  const business = new Business(req.body, [
    'merchantId', 'businessName', 'grossMonthlySales', 'averageTransactionValue'
  ]);
  await business.save();

  res.send(business);
});
/*
router.put('/:id', auth, async (req, res) => {
  let business = Business.findOne(req.params.id);

  let status = {
    status : req.body.status
  }
  business.loan.status[0].push({ status });
  business.save(callback);

});
*/
module.exports = router;