'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = Schema({
    message: {
        required: true,
        type: String
    },
    placeEvent: {
        ref: 'PlaceEvent',
        required: true,
        type: Schema.ObjectId
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

module.exports = mongoose.model('Notification', NotificationSchema);