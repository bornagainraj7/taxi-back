const express = require('express');
const router = express.Router();
const BookingController = require('./../controllers/booking.controller');

router.post('/getAll', BookingController.getAllBookings);

router.post('/new', BookingController.newBooking);

module.exports = router;