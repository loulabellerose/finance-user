 const config = require('config');
 const db = require('mongoose');
 const uniqueValidator = require('mongoose-unique-validator');
 const jwt = require('jsonwebtoken');

 const userSchema = new db.Schema({
    name: {
        type: String,
        required: [true, 'Name is a required field'],
        minlength: 5,
        maxlength: 50
      },
      email: {
        type: String,
        required: [true, 'Email is a required field'],
        minlength: 5,
        maxlength: 255,
        unique: true
      },
      password: {
        type: String,
        required: [true, 'Password is a required field'],
        minlength: 5,
        maxlength: 1024
      },
      role: {
        type: String,
        required: [true, 'Role is a required field']
      }
 });

 userSchema.methods.generateAuthToken = function(){
     const token = jwt.sign({_id: this.id, role: this.role }, config.get('jwtPrivateKey'));
     //could add expiration time
     return token;
 }

 const User = db.model('User', userSchema);

 exports.User = User;