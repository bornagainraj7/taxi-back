const logger = require('tracer').colorConsole();
const tokenLib = require('./../libs/token.lib');
const response = require('./../libs/response.lib');

exports.isAuthorised = (req, res, next) => {
    const token = req.query.authToken || req.params.authToken || req.body.authToken || req.header('authToken');
    if (token) {
        tokenLib.verifyToken(token)
        .then(decoded => {
            req.user = {
                userId: decoded.userId,
                email: decoded.email,
                isDriver: decoded.isDriver,
                fullName: decoded.fullName
            };
            next();
        })
        .catch(error => {
            logger.error(error);
            return response.error(res, 401, null, `Error while verifying Authtoken`);
        });
    } else {
        return response.error(res, 401, null, `No Auth token found`);
    }
}

exports.isDriver = (req, res, next) => {
    if (req.user.isDriver) {
        next();
    } else {
        return response.error(res, 401, null, `Error while verifying user type`);
    }
}