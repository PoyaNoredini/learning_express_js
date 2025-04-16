
const Tour = require('./../models/tourModel');


exports.getAllTours =   async (req , res) => {

try{

    const queryObj = {...req.query};
    const excludeFieleds=['page' , 'sort' , 'limit' , 'fields'];
    excludeFieleds.forEach(el => delete queryObj[el]);

    // advanced fillter 
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b( gte|gt|lte|lt)\b/g, match =>`$ ${match}`);
    console.log(JSON.parse(queryStr));

    const tours =  await Tour.find(queryObj);
    
        res.status(200).json({
            status: 'success',
            result : tours.length,
            data : {
                tours: tours
            }
        });
}
catch(err){
    res.status(404).json({
        status : 'fail',
        message : err.message
    });
    
}
}
exports.getTour = async (req , res) => {

    try{
      const tour =  await Tour.findById(req.params.id );
      // find one tour
      res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message : err 
        }); 
    }
    const id = req.params.id;
    console.log(id);
     
}
exports.createTour = async (req, res) => {
    try {
      const newTour = await Tour.create(req.body);
      res.status(201).json({
        status: 'success',
        data: { tour: newTour }
      });
    } catch (err) {
      console.error('Error creating tour:', err);
      res.status(400).json({
        status: 'fail',
        message: err.message || 'Invalid data sent'
      });
    }
  }

exports.updateTour = async (req , res) => {
    try{
    const tour = await Tour.findByIdAndUpdate(req.params.id , req.body ,{
        new : true,
        runValidators : true
    });
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: 'invalid data sent'
        });
    }
}

exports.deleteTour = async (req , res) => {
    try{
     await Tour.findByIdAndDelete(req.params.id);
     res.status(200).json({
        status: 'success',
        message: 'delete success'
    });
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: 'invalid data sent'
        });
    }
    

    console.log(id);
    res.status(204).json({ 
        status: 'success',
        data: null
    });
}
