const mongoose = require('mongoose');
const slugify = require('slugify');

const  tourSchema  = new mongoose.Schema({
    name : {
      type: String,
      required: true,
      unique : true
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
  console.log(docs);
  next();
});
// tourSchema.post('save' , function(doc , next) {
//   console.log(doc);
//   next();
// });

  const Tour =  mongoose.model('Tour' ,tourSchema );

  module.exports = Tour;
 