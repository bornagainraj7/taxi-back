const BookingModel = require('./../models/booking.model');
const CabModel = require('./../models/cab.model');
const response = require('./../libs/response.lib');
const logger = require('tracer').colorConsole();
const commonLib = require('./../libs/common.lib');
const cabLib = require('./../libs/cab.lib');


exports.newBooking = (req, res, next) => {
    let body = req.body;
    let startCoordinates = body.start.coordinates;
    let endCoordinates = body.end.coordinates;
    let cabType = body.cabType;
    let query = { available : true };
    let eta = 0;
    let distance = commonLib.getDistance(startCoordinates[0], startCoordinates[1], endCoordinates[0], endCoordinates[1]);
    if (distance > 0) {
        eta = commonLib.getEta(distance);
    }

    let price = cabLib.priceCalculator(cabType, distance, eta);

    if (cabType === 2) {
        query.cabType = cabType;
    }


    let pipeline = [
        {
            $geoNear: {
                near: { type: "Point", coordinates: startCoordinates },
                distanceField: 'vehicleDistance',
                maxDistance: 150000,
                distanceMultiplier: 0.001,
                spherical: true,
                num: 1,
                query: query,
            }
        }
    ];

    let stream = CabModel.aggregate(pipeline).cursor().exec();

    

    stream.eachAsync((data) => {
        if (data) {
            let booking = new BookingModel({
                cabId: data._id,
                travellerId: req.user.userId,
                price,
                distance,
                isDiscount: false,
                cabType,
                carBrand: data.carBrand,
                carModel: data.carModel,
                driverId: data.driverId,
                vehicleNumber: data.vehicleNumber,
                location: {
                    start: {
                        latlng: {
                            type: "Point",
                            coordinates: [...startCoordinates]
                        }
                    },
                    end: {
                        latlng: {
                            type: "Point",
                            coordinates: [...endCoordinates]
                        }
                    }
                }
            });

            cabLib.toggleCab(data._id, data.driverId)
            .then(result => {
                return booking.save();
            })
            .then(result => {
                return response.success(res, 201, result, 'Cab booked!!!');
            })
            .catch(err => {
               logger.error(err);
               return response.error(res, 500, null, 'Server Error Occurred');
            });        
        } else {
            return response.error(res, 404, null, 'No cab found for this location');
        }
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