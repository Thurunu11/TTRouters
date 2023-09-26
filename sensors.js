const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    time_rtc3: {
        required: false,
        type: String
    },
    temperature: {
        required: false,
        type: String
    },
    humidity: {
        required: false,
        type: String
    },
    lightIntensity: {
        required: false,
        type: String
    },
    soilmoisture: {
        required: false,
        type: String
    },
    pressure: {
        required: false,
        type: String
    },
    ph_soil: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('sensordata', dataSchema)
