'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;
var bcrypt = require('bcrypt-nodejs');
//packages 
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },

    name: {
        type: String,
        required: 'Please supply a name',
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please Supply an email address'
    },
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

userSchema.virtual('gravatar').get(function () {
    // console.log(this.email);
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`;
});

// userSchema.statics.findOrCreate = require("find-or-create");

userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// module.exports = mongoose.model('User', userSchema);

// var User = mongoose.model('User', userSchema);
// module.exports = User;

module.exports = mongoose.model('User', userSchema);