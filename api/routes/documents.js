//const auth = require('../middleware/auth');
const config = require('config');
const db = require('mongoose');
//const { Loan } = require('../models/loan');
const { Business } = require('../models/business');
//const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const router = express.Router();

/*
router.put('/:id', async (req, res) => {
    const business = await Business.findById(req.params.id);
    console.log("uploading those files");
  
    business.loan.documents = "uploaded";
  
    const success = await business.save();
    res.send(success);
  });
  //A merchant uploads their business documentation by finding the existing business document and adding to the loan subdocument
  */
router.post('/:id', async (req, res) => {

  const business = await Business.findById(req.params.id);

  business.loan.documents = req.body.imgsource;

  //if (!file) return res.status(404).send('No file provided.');
  if (!business) return res.status(404).send('Loan application not found.');
  const success = await business.save();
  res.send(success);
});


module.exports = router;
