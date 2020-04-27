const CabModel = require('./../models/cab.model');
const logger = require('tracer').colorConsole();
const response = require('./../libs/response.lib');
const cabLib = require('./../libs/cab.lib');

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

exports.toggleAvailability = async (req, res, next) => {
    const cabId = req.params.id;
    const driverId = req.user.userId;
    
    try {
        const toggle = cabLib.toggleCab(cabId, driverId);
        return response.success(res, 201, null, 'Cab Availability Changed');
    } catch (error) {
        logger.error(error);
        return response.success(res, 500, null, 'Error while changing cab availability');
    }
};

exports.getAllCabs = async(req, res, next) => {
    const driverId = req.user.userId;

    try {
        const data = await CabModel.find({ driverId });
        return response.success(res, 200, data, 'All cabs fetched');
    } catch (error) {
        logger.error(error);
        return response.error(res, 500, null, 'Server Error Occurred');
    }
}