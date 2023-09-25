const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

    time_rtc2: {
        required: false,
        type: String
    },
    visualdata: {
        required: false,
        type: String
    },

})

module.exports = mongoose.model('esp32camimage', dataSchema)