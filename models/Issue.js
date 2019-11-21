'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IssueSchema = Schema({
    uId: {
        ref: 'User',
        required: true,
        type: Schema.ObjectId
    },
    placeEvent:{
        ref: 'PlaceEvent',
        required: true,
        type: Schema.ObjectId
    },
    description: {
        required: true,
        type: String,
    },
    manager:{
        ref: 'Admin',
        type: Schema.ObjectId
    },
    status: {
        default: 'open',
        required: true,
        type: String
    },
    userRate: {
        default: 0,
        required: true,
        type: Number
    },
    answers: [{
        required: true,
        type: Number
    }],
    finalComment: String,
    registerDate: {
        default: Date.now(),
        required: true,
        type: Date
    }
});

module.exports = mongoose.model('Issue', IssueSchema);