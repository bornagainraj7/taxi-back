const CabModel = require('./../models/cab.model');
const logger = require('tracer').colorConsole();

exports.toggleCab = (cabId, driverId) => {
    let query = { _id: cabId, isDriver: driverId };

    return new Promise((resolve, reject) => {
        CabModel.findById(cabId)
        .then(cab => {
            let newCab = CabModel({
                _id: cabId,
                available: !cab.available
            });

            return CabModel.updateOne(query, newCab);
        })
        .then(result => {
            if (result.n > 0) {
                resolve('Cab Availability Changed');
            }
            reject('Unable to Change Cab Availability');
        })
        .catch(error => {
            logger.error(error);
            reject('Server Error Occurred');
        });
    });
} 