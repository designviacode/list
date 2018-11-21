"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;
var bcrypt = require("bcrypt-nodejs");
//packages
const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },

  name: {
    type: String,
    required: "Please supply a name"
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please Supply an email address"
  }
  // password: String,
  // subscription_active: false

  // addedQuestions: {
  //     ref: 'post'
  // },
  // items: {
  //     ref: 'post'
  // },
  // votedItems: {
  //     ref: 'vote'
  // }
});

UserSchema.virtual("gravatar").get(function() {
  // console.log(this.email);
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

// UserSchema.statics.findOrCreate = require("find-or-create");

// UserSchema.plugin(mongodbErrorHandler);
UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// module.exports = mongoose.model('User', UserSchema);

// var User = mongoose.model('User', UserSchema);
// module.exports = User;

module.exports = mongoose.model("user", UserSchema);
