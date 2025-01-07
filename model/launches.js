const mongoose = require("mongoose")

const Schema = mongoose.Schema

const launchSchema = new Schema({
    name: {
      type: String 
    },
    provider: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: String
    }

})

const Launch = mongoose.model('Launches', launchSchema, "Launches")

module.exports = Launch