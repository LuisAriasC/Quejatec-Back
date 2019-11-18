'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceEventSchema = Schema({
    dueDate: Date,
    name: {
        required: true,
        type: String
    },
    placeEventGroup: {
        ref: 'PlaceEventGroup',
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
    },
    type: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('PlaceEvent', PlaceEventSchema);