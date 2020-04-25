const mongoose = require('mongoose');

const cabSchema = mongoose.Schema({
    cabType: { type: Number, emun: [1, 2, 3] },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vehicleNumber: { type: String },
    currentLocation: {
        lat: { type: String, required: true },
        long: { type: String, required: true },
    },
    carMake: String,
    carModel: String,
    carBrand: String,
    additionalCost: Number
});

module.exports = mongoose.model('Cab', cabSchema);

// cabType:
// 1: normal
// 2: pink
// 3: black