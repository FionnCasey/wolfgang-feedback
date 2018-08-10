require('dotenv').config({ path: '../.env' });

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import router from './routes/index';

const app = express();

const PORT = process.env.PORT || 3001;

// Configure api.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', router);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// MongoDB configuration.
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
