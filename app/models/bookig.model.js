const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    cabId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cab', require: true, index: true },
    price: { type: Number },
    discoutedPrice: { type: Number },
    isDiscount: { type: Boolean },
    createdOn: { type: Date, default: Date.now },
    rideStartTime: { type: Date },
    rideEndTime: { type: Date },
    rideDuration: { type: Number },
    cabType: { type: Number, default: 1, enum: [1, 2, 3] },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, index: true },
    vehicleNumber: { type: String },
    location: {
        start: {
            latlng: {
                lat: String,
                long: String
            },
            fullAddress: String,
            city: String,
        },
        end: {
            latlng: {
                lat: String,
                long: String
            },
            fullAddress: String,
            city: String,
        }
    }
});

module.exports = mongoose.model('Booking', bookingSchema);

// cabType:
// 1: normal
// 2: pink
// 3: black