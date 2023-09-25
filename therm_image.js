const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    // tf_id: {
    //     required: true,
    //     type: Number
    // },
    time_rtc1: {
        required: false,
        type: String
    },
    thermaldata: {
        required: false,
        type: String
    }



    // date1: {
    //     required: false,
    //     type: String
    // }
})

module.exports = mongoose.model('thermalimages', dataSchema)