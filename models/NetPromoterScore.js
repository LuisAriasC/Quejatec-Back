'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NetPromoterScoreSchema = Schema({
    placeEvent:{
        ref: 'PlaceEvent',
        required: true,
        type: Schema.ObjectId
    },
    score: {
        required: true,
        type: Number,
    },
    registerDate: {
        default: Date.now(),
        required: true,
        type: Date
    }
});

module.exports = mongoose.model('NetPromoterScore', NetPromoterScoreSchema);