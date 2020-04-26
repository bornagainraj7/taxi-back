const UserModel = require('./../models/user.model');
const bcrypt = require('bcryptjs');

const logger = require('tracer').colorConsole();
const tokenLib = require('./../libs/token.lib');
const response = require('./../libs/response.lib');

exports.signUpUser = async (req, res, next) => {
    logger.info();
    const email = req.body.email;
    const password = req.body.password;
    const driver = req.body.driver || false;
    const fullName = req.body.fullName;

    try {
        const hash = await bcrypt.hash(password, 10);

        const user = new UserModel({
            fullName,
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
    logger.info();

    const email = req.body.email;
    const password = req.body.password;

    let findUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email })
            .then(user => {
                if (!user) {
                    reject(`User not found`);
                } else {
                    resolve(user);
                }
            });
        });
    };

    let comparePassword = (userData) => {
        logger.info(userData);
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, userData.password)
            .then(result => {
                if (result) {
                    delete userData.password;
                    resolve(userData);
                } else {
                    reject(`Password doesn't match`);
                }
            });
        });
    };

    let generateToken = (userData) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userData)
            .then(token => {
                if (token) {
                    resolve(token);
                } else {
                    reject(`Error while generating token`);
                }
            })
        });
    }

    (async() => {
        try {
            const user = await findUser();
            const userData = await comparePassword(user);
            const token = await generateToken(userData);
            return response.success(res, 200, token, 'Logged in successfully');
        } catch(error) {
            logger.error(error);
            return response.error(res, 401, null, 'Unable to verify user details');
        }
    })();


}
