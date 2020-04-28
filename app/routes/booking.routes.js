const express = require('express');
const router = express.Router();
const BookingController = require('./../controllers/booking.controller');
const authMiddleware = require('./../middlewares/auth.middleware');


router.get('/getAll', authMiddleware.isAuthorised, BookingController.getAllBookings);

router.post('/new', authMiddleware.isAuthorised, BookingController.newBooking);

module.exports = router;