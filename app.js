const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/toureRouter');
// const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);

module.exports = app;