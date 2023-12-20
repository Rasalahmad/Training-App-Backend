import cors from 'cors';
import express from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';

import cookieParser from 'cookie-parser';
import routes from './app/routes/index.js';

const app = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// access static file
app.use(express.static('src/uploads'));
app.use('/teachers', express.static('teachers'));
app.use('/notices', express.static('notices'));
app.use('/gallery', express.static('gallery'));
app.use('/result', express.static('result'));
app.use('/courses', express.static('courses'));
app.use('/banners', express.static('banners'));

app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
