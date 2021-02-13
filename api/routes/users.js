const config = require('config');
const db = require('mongoose');
const { User } = require('../models/user');
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
  await User.find({}).then(eachOne => {
    res.json(eachOne);
  })
});
/*
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});
*/
router.get('/:id', [auth, admin], async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found.');
  res.send(user);
});

router.post('/new', [auth, admin], async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Account already exists with this email address');

  user = new User(req.body, ['name', 'email', 'password', 'role']);
  user.password = await bcryptjs.hash(user.password, 10);
  await user.save();

  res.header('token', token).send(user);
});

router.put('/:id', [auth, admin], async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }, { new: true }
  );
  if (!user) return res.status(404).send('User was not found.');

  res.send(user);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('User not found');

  res.send(user);
});

module.exports = router;

