const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/toureRouter');
// const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appErrors');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
app.use(express.json());

app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl} on this server`,404));
});


app.use(globalErrorHandler);

// app.use('/api/v1/users', userRouter);
module.exports = app;