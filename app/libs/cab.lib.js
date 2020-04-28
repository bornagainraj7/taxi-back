const CabModel = require('./../models/cab.model');
const logger = require('tracer').colorConsole();
const commonLib = require('./common.lib');

exports.toggleCab = (cabId, driverId) => {
    let query = { _id: cabId, driverId: driverId };

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
};

exports.priceCalculator = (cabType, distance, eta) => {
    let basePrice = 0;
    if (cabType === 2) {
        basePrice = 5;
    }
    let price = Math.ceil(eta) + Math.ceil(2 * distance) + basePrice;
    return price;
};