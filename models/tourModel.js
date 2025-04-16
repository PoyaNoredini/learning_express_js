const mongoose = require('mongoose');


const  tourSchema  = new mongoose.Schema({
    name : {
      type: String,
      required: true,
      unique : true
    },
    rating : {
      type : Number,
      default: 4.5,
      required:[true , 'a toure must have a rating ']
    },
    price : {
      type : Number,
      required:[true , 'a toure must have a price']
    },
  }) 
  
  const Tour =  mongoose.model('Tour' ,tourSchema );



  module.exports = Tour;
