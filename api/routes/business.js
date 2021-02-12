const express = require('express');
const db = require('mongoose');
const { Business } = require('../models/business');
const { route } = require('./users');
//const { Merchant } = require('../models/merchant');
const router = express.Router();

router.get('/', async (req, res) => {
  await Business.find({}).then(eachOne => {
    res.json(eachOne);
  })
});

/*
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
*/

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

/*
Finds business by ID and inserts loan
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
*/

//THIS METHOD IS WHERE THE WORK NEEDS TO BE DONE

router.put('/:id', async (req, res) => {
  let business = Business.findOne(req.params.id);
  console.log(business);

  let status = {
    status : req.body.status
  }


  business.loan.status[0].push({ status });

  business.save(callback);

});
/*
router.put('/:id', async (req, res) => {
  Business.findOneAndUpdate(
    { _id: req.params.id },
    { loan : { $push: {status : req.body.status} } },
    function (error, success) {
      if (error) {
          console.log(error);
      } else {
          console.log(success);
      }
    });

  if (!business) return res.status(404).send('Business not found.');
  await business.save()
  .then(res.send(business.loan));
});
*/
module.exports = router;