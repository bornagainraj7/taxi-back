const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    cabId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cab', require: true, index: true },
    travellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, index: true },
    price: { type: Number },
    discoutedPrice: { type: Number },
    isDiscount: { type: Boolean },
    createdOn: { type: Date, default: new Date() },
    cabType: { type: Number, default: 1, enum: [1, 2] },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, index: true },
    carBrand: { type: String },
    carModel: { type: String },
    vehicleNumber: { type: String },
    distance: { type: String },
    location: {
        start: {
            latlng: {
                type: { type: String, enum: ['Point'] },
                coordinates: { type: [Number] }
            },
        },
        end: {
            latlng: {
                type: { type: String, enum: ['Point'] },
                coordinates: { type: [Number] }
            },
        }
    }
});

bookingSchema.index({ 'location.start.latlng': '2dsphere' });
bookingSchema.index({ 'location.end.latlng': '2dsphere' });

module.exports = mongoose.model('Booking', bookingSchema);

// cabType:
// 1: normal
// 2: pink