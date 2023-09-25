const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    sg_id: {
        required: true,
        type: Number
    },
    time_rtc0: {
        required: false,
        type: String
    },
    time: {
        required: false,
        type: String
    },
    frequency: {
        required: false,
        type: String
    },
    magnitude: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('ttsignal', dataSchema)