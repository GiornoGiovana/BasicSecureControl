const express = require('express');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption'); //packeg use to encrypt with a KEY, and it decrypt when use Mongoose.find()

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const secret = process.env.SECRET;
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']}); //encypt password with key secret



const User = mongoose.model('User', userSchema);

module.exports = User;