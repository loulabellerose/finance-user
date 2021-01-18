const config = require('config');
const db = require('mongoose');
const { User } = require('../models/user');
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  await User.find({}).then(eachOne => {
    res.json(eachOne);
  })
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found.');
  res.send(user);
});

router.post('/new', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Account already exists with this email address');

  user = new User(req.body, ['name', 'email', 'password', 'isAdmin']);
  user.password = await bcryptjs.hash(user.password, 10);
  await user.save();

  res.header('auth-token', token).send(user);
});

router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin
    }, { new: true }
  );
  if (!user) return res.status(404).send('User was not found.');

  res.send(user);
});

router.delete('/:id', async (req, res) => {
  //router.delete('/:id', [auth, admin], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('User not found');

  res.send(user);
});

module.exports = router;

