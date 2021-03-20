const auth = require('../middleware/auth');
const config = require('config');
const db = require('mongoose');
const { Loan } = require('../models/loan');
const { Business } = require('../models/business');
const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const { Expo } = require('expo-server-sdk');

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
      currentStatus: 'Submitted by Merchant'
    }]
  }

  business.pushToken = req.body.pushToken;

  if (!business) return res.status(404).send('Loan application not found.');

  const success = await business.save();
  res.send(success);
});

//Updating the status of an existing loan is done by inserting a new status object into the loan's status array
router.post('/:id', async (req, res) => {
  const business = await Business.findById(req.params.id);
  if (!business) return res.status(404).send('Biz not found.');

  const statusUpdate = {
    status: {
      currentStatus: req.body.currentStatus
    }
  };
  business.loan.status.push(statusUpdate.status);
  const update = '';
/*
  //Below calls function to send push notification to merchant's device if status update matches condition
  if (statusUpdate.status.currentStatus == 'Documentation Requested') {
    update = 'Update to loan application status: documentation has been requested';
    nofityUser(update, pushToken);
  }

  else if (statusUpdate.status.currentStatus == 'Approved') {
    update = 'Update to loan application status: your loan application was approved!';
    nofityUser(update, pushToken);

  }
  else if (statusUpdate.status.currentStatus == 'Rejected') {
    update = 'Update to loan application status: yourloan application was rejected';
    nofityUser(update, pushToken);
  }
  */
  const success = await business.save();
  res.send(success);
});
/*
const notifyUser = (update, pushToken) => {
  let expo = new Expo();
  let message = '';

  // Get the user's pushToken from DB. Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

  // Check that push token appears to be valid Expo push token
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    //continue;
  }
  // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
  message.push({
    to: pushToken,
    sound: 'default',
    body: `${update}`,
    data: { withSome: 'data' },
  })
};
*/
module.exports = router;