const mongoose = require('mongoose');


const  tourSchema  = new mongoose.Schema({
    name : {
      type: String,
      required: true,
      unique : true
    },
    durations : {
      type: Number,
      required: [true, 'a tour must have a duration'],
    },
    maxGroupSize : {
      type: Number,
      required: [true, 'a tour must have a group size'],
    },
    difficulty : {
      type: String,
      required: [true, 'a tour must have a difficulty'],
    },
    ratingAvrage : {
      type : Number,
      default: 4.5,
      required:[true , 'a toure must have a rating ']
    },
    reatingQuantity : {
      type : Number,
      default: 0,
      required:[true , 'a toure must have a rating quantity']
    },
    price : {
      type : Number,
      required:[true , 'a toure must have a price']
    },
    priceDiscount : Number,
    summary : {
      type : String,
      trim: true,
      required: [true, 'a tour must have a description'],
    },
    description : {
      type : String,
      trim: true
    },
    imageCover : {
      type : String,
      required: [true, 'a tour must have a cover image'],
    },
    images : [String],
    createdAt : {
      type : Date,
      default: Date.now()
    },
    startDates : [Date],
  }) 
  
  const Tour =  mongoose.model('Tour' ,tourSchema );



  module.exports = Tour;
