if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: '../.env' });

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import validator from 'express-validator';

import { auth, awarewolf } from './routes';
import { verifyJwt } from './utils';

const app = express();

const PORT = process.env.PORT || 3001;
const DB_URI = process.env.NODE_ENV === 'production' ? process.env.DB_URI : process.env.TEST_DB_URI;

app.use(express.static(path.join(__dirname, '../client/build')));

// Middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(validator());

if (process.env.NODE_ENV !== 'production') app.use(logger('dev'));

app.use('/auth', auth);

// Authorisation required for these routes.
app.use('/api', verifyJwt, awarewolf);

app.listen(PORT, () => console.log(`Running on ${PORT}`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

// MongoDB configuration.
mongoose.connect(DB_URI, { useNewUrlParser: true }, () => console.log('Connected to MongoDB'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
