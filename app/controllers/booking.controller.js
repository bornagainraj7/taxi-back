const BookingModel = require('./../models/booking.model');
const CabModel = require('./../models/cab.model');
const response = require('./../libs/response.lib');
const logger = require('tracer').colorConsole();

exports.newBooking = (req, res, next) => {
    let query = {};
    let body = req.body;
    let coordinates = [body.location.start.latlng.coordinates];

    cabType = req.query.cabType;
    if (cabType == 2) {
        query = { cabType: cabType };
    }

    let pipeline = [
        {
            $geoNear: {
                near: { type: "Point", coordinates: coordinates },
                distanceField: 'vehicleDistance',
                maxDistance: 150000,
                distanceMultiplier: 0.001,
                spherical: true,
                num: 10,
                query: query,
            }
        }
    ];

    let stream = CabModel.aggregate(pipeline).cursor().exec();

    stream.eachAsync((data) => {
        
    })
    .catch(error => {
        logger.error(error);
        return response.error(res, 500, null, 'Server Error Occurred');
    });

};


exports.getAllBookings = (req, res, next) => {
    const userId = req.user.userId;
    BookingModel.find({ travellerId: userId })
    .then(result => {
        if (result.length) {
            return response.success(res, 200, result, 'Bookings fetched successfully');
        }
        return response.error(res, 404, null, 'No bookings found');
    })
    .catch(error => {
        logger.error(error);
        return response.error(res, 500, null, 'Server Error occurred');
    });
}