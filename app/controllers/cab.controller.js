const CabModel = require('./../models/cab.model');
const logger = require('tracer').colorConsole();
const response = require('./../libs/response.lib');

exports.addNewCab = (req, res, next) => {
    const body = req.body;
    body.available = true;
    body.driverId = req.user.userId;
    
    const cab = new CabModel(body);
    cab.save()
    .then(result => {
        return response.success(res, 201, result, `Cab Added Successfully`);
    })
    .catch(error => {
        logger.error(error);
        return response.error(res, 500, error, `Server Error Occurred`);
    });
};

exports.toggleAvailability = (req, res, next) => {
    const cabId = req.params.id;
    let query = { _id: cabId, isDriver: req.user.userId };

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
            return response.success(res, 201, null, 'Cab Availability Changed');
        }
        return response.success(res, 401, null, 'Unable to Change Cab Availability');
    })
    .catch(error => {
        logger.error(error);
        return response.success(res, 500, null, 'Server Error Occurred');
    });
};