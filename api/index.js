const db = require('mongoose');
const users = require('./routes/users');
const loans = require('./routes/loans');
const merchantaccounts = require('./routes/merchantaccounts');
const merchantbusiness = require('./routes/merchantbusinesses');
const login = require('./routes/auth');
const cors = require('cors')
const express = require('express');
const router = express.Router();
const app = express();
const config = require('config');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

db.connect('mongodb://localhost:27017/rise-app')
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Unable to connect to database'));

app.use(express.json());
app.use(cors());
app.use('/users', users);
app.use('/loans', loans);
app.use('/login', login);
app.use('/merchantaccounts', merchantaccounts);
app.use('/merchantbusiness', merchantbusiness);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));