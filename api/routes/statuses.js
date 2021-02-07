const config = require('config');
const db = require('mongoose');
const {Status, statusSchema} = require('../models/status');
const { Business } = require('../models/business');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const status = await statusSchema.findById(req.params.id);
    //check parameter for status id
    if (!status) return res.status(404).send('Application status update not found.');
    res.send(status);
  });

//Adding a new status is done by updating the loan

  
  module.exports = router;