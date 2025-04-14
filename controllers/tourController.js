
const Tour = require('./../models/tourModel');



   
        

exports.getAllTours = (req , res) => {
    res.status(200).json({
        status: 'success',
        result : '<number of tours here>',
        data : {
            tours: '<tours here>'
        }
    });
}
exports.getTour = (req , res) => {
    const id = req.params.id;
    console.log(id);
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<tour here>'
        }
    }); 
}
exports.createTour = (req , res) => {
    console.log(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            tour: '<tour here>'
        }
    });
}

exports.updateTour = (req , res) => {
    const id = req.params.id;
    console.log(id);
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<tour here>'
        }
    });
}

exports.deleteTour = (req , res) => {
    const id = req.params.id;
    console.log(id);
    res.status(204).json({ 
        status: 'success',
        data: null
    });
} 
