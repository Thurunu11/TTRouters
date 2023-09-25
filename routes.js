const express = require('express');

const CamImage = require('../models/camimage');
const ThermImage = require('../models/therm_image');
const SenData = require('../models/sensors');
const EpData = require('../models/ep_signal');

const router = express.Router()


//------------------------Post Method - ESP32CAM_images------------------------//

router.post('/camimages', async (req, res) => {
    const data = new CamImage({
        // vf_id: req.body.vf_id,
        time_rtc2: req.body.buffer_time2,
        // date2: req.body.date2,
        visualdata: req.body.image_data
    })

    try {
        const dataToSave = await data.save();
        console.log('Visual Data saved successfully:');
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})


//-----------------------Post Method - thermal images-------------------//

router.post('/thermalimages', async (req, res) => {
    // console.log('Received POST request with data:', req.body);

    try {
        const data = new ThermImage({
            time_rtc1: req.body.buffer_time,
            thermaldata: req.body.current_val
        });

        const dataToSave = await data.save();
        console.log('Thermal data saved successfully:');
        // res.status(200).json(dataToSave);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(400).json({ message: error.message });
    }
});


//---------------Get all Images from the database-----------------//

router.get('/getImageFeed', async (req, res) => {
    try{
        let pageNo_thermal = req.query.pageNo_thermal ? req.query.pageNo_thermal : 0;      ///----------------> Want to sort this out
        let pageNo_visual = req.query.pageNo_visual ? req.query.pageNo_visual : 0;      ///----------------> Want to sort this out

        const data_cam = await CamImage.find({
            time_rtc1: { $ne: null }
        }).limit(10).skip(parseInt(pageNo_visual) * 10);


        const data_thermal = await ThermImage.find({
            time_rtc1: { $ne: null }
        }).limit(10).skip(parseInt(pageNo_thermal) * 10);


//  ___________Counting thermal and visual data entries __________________  //
        const camData_count  = await CamImage.countDocuments();
        const ThermData_count  = await ThermImage.countDocuments();

        const result = {
            image:data_cam,
            thermal:data_thermal,
            image_count:camData_count,
            thermal_count:ThermData_count
        }
        res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//-----------------------Post Method - Sensor Data  -------------------//

router.post('/sensordata', async (req, res) => {
    // console.log('Received POST request with data:', req.body);

    try {
        const data = new SenData({
            time_rtc3: req.body.time_sensor,
            pressure: req.body.pressure,
            humidity: req.body.humid,
            temp_data: req.body.temp,
            lightIntensity: req.body.lux,
            soilmoisture: req.body.moist,
            ph: req.body.soil_ph,
        });

        const dataToSave = await data.save();
        console.log('Sensor Data Saved Successfully!');
        // res.status(200).json(dataToSave);
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(400).json({ message: error.message });
    }
});


//-----------------------Get Method - Sensor Data  -------------------//


router.get('/getSensorFeed', async (req, res) => {
    try{
        let pageNo_sensor  = req.query.pageNo_sensor ? req.query.pageNo_sensor  : 0;      ///----------------> Want to sort this out

        const data_sensor = await SenData.find({
            time_rtc3: { $ne: null }
        }).limit(10).skip(parseInt(pageNo_sensor) * 10);

//  ___________Counting sensor data entries __________________  //
        const senData_count  = await SenData.countDocuments();
        res.json(senData_count)
    }

    catch(error){
        res.status(500).json({message: error.message})
    }
})








//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})

module.exports = router;