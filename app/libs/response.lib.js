exports.success = (res, status, data, message) => {
    return res.status(status).send({
        error: false,
        message,
        data
    });
};

exports.error = (res, status, data, message) => {
    return res.status(status).send({
        error: true,
        message,
        data
    });
};