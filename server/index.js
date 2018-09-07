if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: '../.env' });

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import validator from 'express-validator';

import { auth, feedbackApp } from './routes';
import { verifyJwt } from './utils';

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../client/build')));

// Middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(validator());

app.use('/auth', auth);

// Authorisation required for these routes.
app.use('/api', verifyJwt, feedbackApp);

app.listen(PORT, () => console.log(`Running on ${PORT}`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

// MongoDB configuration.
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, () => console.log('Connected to MongoDB'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
