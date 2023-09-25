const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    sd_id: {
        required: true,
        type: Number
    },
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
    },    visualdata: {
        required: false,
        type: String
    },
    ph: {
        required: false,
        type: String
    },
    date3: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('sensordata', dataSchema)
