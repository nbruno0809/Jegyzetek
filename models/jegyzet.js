const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Jegyzet = db.model('Jegyzet', {
    oldalszam: Number,
    nyelv: String,
    ev: Number,
    tipus: String,
    _targy: {
        type: Schema.Types.ObjectId,
        ref: "Targy"
    }
});

module.exports = Jegyzet;
