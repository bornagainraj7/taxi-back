const mongoose = require('mongoose');

const cabSchema = mongoose.Schema({
    cabType: { type: Number, emun: [1, 2] },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vehicleNumber: { type: String },
    currentLocation: {
        latlng: {
            type: { type: String, enum: ['Point'] },
            coordinates: { type: [Number] }
        },
    },
    carModel: String,
    carBrand: String,
    available: Boolean,
});

cabSchema.index({ 'currentLocation.latlng': '2dsphere' });

module.exports = mongoose.model('Cab', cabSchema);

// cabType:
// 1: normal
// 2: pink