const db = require('mongoose');
const users = require('./routes/users');
const loans = require('./routes/loans');
const merchants = require('./routes/merchants');
const business = require('./routes/business');
const status = require('./routes/statuses');
const login = require('./routes/auth');
const documents = require('./routes/documents');
const cors = require('cors');
const express = require('express');
const router = express.Router()
const app = express();
const config = require('config');
const database = config.get('db');


if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

db.connect(database)
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Unable to connect to database'));

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://pure-reef-66274.herokuapp.com"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.use('/users', users);
app.use('/loans', loans);
app.use('/loans/:id/status', status);
app.use('/login', login);
app.use('/merchants', merchants);
app.use('/business', business);
app.use('/documents', documents);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

