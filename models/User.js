'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    email: {
        dropDups: true,
        required: true,
        type: String,
        unique: true
    },
    lastname: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    registerDate: {
        default: Date.now(),
        required: true,
        type: Date
    },
    status: {
        default: 'active',
        required: true,
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);