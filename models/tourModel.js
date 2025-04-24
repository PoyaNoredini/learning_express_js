const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const  tourSchema  = new mongoose.Schema({
    name : {
      type: String,
      required: true,
      unique : true,
      trim:true,
      maxlength: [40, 'a tour name must have less or equal than 40 characters'],
      minlength: [10, 'a tour name must have more or equal than 10 characters'],
      validate: [validator.isAlpha, 'Tour name must only contain characters'],

    },

    slug:String,

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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty is either : easy , medium , difficult'
      }
    },
    ratingAvrage : {
      type : Number,
      default: 4.5,
      required:[true , 'a toure must have a rating '],
      min: [1, 'a tour rating must be above 1.0'],
      max: [5, 'a tour rating must be below 5.0'],
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
    priceDiscount :{
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price; // 100 < 200
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
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
      default: Date.now(),
      select:false,
    },
    startDates : [Date],
    
    secretTour : {
      type: Boolean,
      default: false
    },
  
  },
  {
    toJSON:{ virtuals: true}, // for acecpt virtual properties
    toObject:{ virtuals: true},
  });

  tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
  });

// tourSchema.pre('save', function(next) {
//   console.log('will save document...');
//   next();
// });
// query middleware
tourSchema.pre('find', function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});


// this document middleware: runs before .save() and create() . insertMany()
tourSchema.pre('save' , function(next) {
 this.slug = slugify(this.name , { lower : true });
 this.start = Date.now();
 next();
});

tourSchema.post(/^find/ , function(doc , next){
  console.log(`query took ${Date.now() - this.start} milliseconds` )

  next();
});
// aggregation middleware
tourSchema.pre('aggregate', function(next) {
  // Fix: Change pipline to pipeline
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});


  const Tour =  mongoose.model('Tour' ,tourSchema );

  module.exports = Tour;
 