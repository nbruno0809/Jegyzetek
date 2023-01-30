const Schema = require("mongoose").Schema
const db = require("../config/db")

const Targy = db.model("Targy", {
    nev: String,
    kod: String,
    kredit: Number
})

module.exports = Targy
