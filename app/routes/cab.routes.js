const express = require('express');
const router = express.Router();
const CabController = require('./../controllers/cab.controller');
const authMiddleware = require('./../middlewares/auth.middleware');

router.post('/add', authMiddleware.isAuthorised, authMiddleware.isDriver, CabController.addNewCab);

router.get('/toggle/:id', authMiddleware.isAuthorised, authMiddleware.isDriver, CabController.toggleAvailability);

router.get('/get', authMiddleware.isAuthorised, authMiddleware.isDriver, CabController.getAllCabs);

module.exports = router;