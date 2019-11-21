'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceEventGroupSchema = Schema({
    name: {
        required: true,
        type: String
    },
    placeEvents: {
        required: true,
        type: [{
            ref: 'PlaceEvent',
            required: true,
            type: Schema.ObjectId
        }]
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

module.exports = mongoose.model('PlaceEventGroup', PlaceEventGroupSchema);