const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookRouter = require('./routes/bookRoutes');

const app = express();

//* Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//* Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cors());

//? Routes

app.get('/express_backend', (req, res) => {
  //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/books', bookRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
