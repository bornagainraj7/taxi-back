const UserModel = require('./../models/user.model');
const bcrypt = require('bcryptjs');

const logger = require('tracer').colorConsole();
const tokenLib = require('./../libs/token.lib');
const response = require('./../libs/response.lib');

exports.signUpUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const driver = req.body.driver;

    try {
        const hash = await bcrypt.hash(password, 10);

        const user = new UserModel({
            email,
            password: hash,
            isDriver: driver
        });
        const createdUser = await user.save();
        response.success(res, 201, user, 'User registered successfully');
    } catch (err) {
        logger.error(err);
        response.error(res, 500, null, 'Server Error occurred, try again later');
    }
};


exports.loginUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let userData = null;

    UserModel.findOne({ email })
    .then(user => {
        if (!user) {
            return response.error(res, 401, null, 'User doesn\'t exists');
        }
        delete user.password;
        userData = user;
        return bcrypt.compare(password, user.password);
    })
    .then(result => {
        if (!result) {
            return response.error(res, 401, null, 'Credential didn\'t matched');
        }
        return tokenLib.generateToken(userData);
    })
    .then(token => {
        return response.success(res, 200, token, 'Logged in successfully');
    })
    .catch(error => {
        logger.error(error);
        return response.error(res, 500, null, 'Server Error occurred, try again later');
    });
}
