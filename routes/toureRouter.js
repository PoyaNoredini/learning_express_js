const express = require('express');
const tourController = require('./../controllers/tourController.js');

const router = express.Router();


// route.param('body' , tour Controller.checkBody);
router
.route('/top-5-cheap')
.get(tourController.aliasTopTours ,tourController.getAllTours);

router
.route('/get-stats').get(tourController.getTourStats);


router
.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);


router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);
router
    .route('/:id')
    .get(tourController.getTour) 
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);


module.exports = router;