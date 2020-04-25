const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    cabId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cab', require: true, index: true },
    price: { type: Number },
    discoutedPrice: { type: Number },
    discount: { type: Number },
    createdOn: { type: Date, default: Date.now },
    rideStartTime: { type: Date },
    rideEndTime: { type: Date },
    rideDuration: { type: Number },
    cabType: { type: Number, default: 1, enum: [1, 2, 3] }
});

module.exports = mongoose.model('Booking', bookingSchema);

// cabType:
// 1: normal
// 2: pink
// 3: black