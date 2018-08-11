const mongoose = require('mongoose')
//bcrypt to hash passwords
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

//hash passwords
const hashPassword = (password, finishedHashingPasswordCallback) => {
  if (!password) {
    // return error for not giving password
    return finishedHashingPasswordCallback(new Error('No Password Supplied!'));
  }
  // generate the salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return finishedHashingPasswordCallback(new Error('Error generating salt for password!'));
    }
    // use salt to generate hashed password - bcrypt npm
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        return finishedHashingPasswordCallback(new Error('Error hasing password'));
      }
      // call the callback with no error and a hashed password
      finishedHashingPasswordCallback(null, hashedPassword);
    });
  });
}

//set schema
const UserSchema = new Schema({
  handle: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  ads: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Ad'
    }
  ]
})

//hide passwords
UserSchema.set('toJSON', {
  transform: function(doc, json) {
    return {
      id: json._id,
      handle: json.handle,
      email: json.email,
      about: json.about
    }
  }
})

//
UserSchema.pre('save', function (next) {
  const userToSave = this
  hashPassword(userToSave.password, (err, hashedPassword) => {
    if (err) {
      return next(err)
    }
    userToSave.password = hashedPassword
    next()
  });
})


module.exports = mongoose.model('User', UserSchema)
