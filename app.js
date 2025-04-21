const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/toureRouter');
// const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRouter);


app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `can't find ${req.originalUrl} on this server`
    })

});

// app.use('/api/v1/users', userRouter);
module.exports = app;