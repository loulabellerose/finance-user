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
const expo = new Expo();

const notifyUser = ( update, somePushTokens ) => {
  let messages = [];
  for (let pushToken of somePushTokens) {
    messages.push({
      to: pushToken,
      sound: 'default',
      title: 'RISE Reinvesting in Small Businesses',
      body: update
    })
  }

let chunks = expo.chunkPushNotifications(messages);
let tickets = [];
(async () => {
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
})();

};

router.get('/', auth, async (req, res) => {
  await Loan.find({}).then(eachOne => {
    res.json(eachOne);
  })
});

router.get('/:id', auth, async (req, res) => {
  if (!db.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Invalid ID');
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

  business.pushTokens.push(req.body.pushToken);

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

  const success = await business.save();
  res.send(success);

});

router.post('/:id/notify', async (req, res) => {
  const business = await Business.findById(req.params.id);
  if (!business) return res.status(404).send('Biz not found.');

  const update = req.body.update;
  const userTokens = [business.pushTokens];  

    notifyUser(update, userTokens);
    res.send("Notifcation sent");
    console.log("Console log: " + update);
});

module.exports = router;