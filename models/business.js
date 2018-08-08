const mongoose = require('mongoose')
const Schema = mongoose.Schema
//bcrypt to hash passwords
const bcrypt = require('bcrypt')

//hash passwords via bcrypt
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

//define schema
const BusinessSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Campaign'
    }
  ]
})

//hide passwords
BusinessSchema.set('toJSON', {
  transform: function(doc, json) {
    return {
      id: json._id,
      name: json.name,
      email: json.email,
    }
  }
})

//
BusinessSchema.pre('save', function (next) {
  const businessToSave = this
  hashPassword(businessToSave.password, (err, hashedPassword) => {
    if (err) {
      return next(err)
    }
    businessToSave.password = hashedPassword
    next()
  });
})

let Business = mongoose.model('Business', BusinessSchema)

module.exports = Business
