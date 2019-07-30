require('dotenv').config();
import * as mongoose from 'mongoose';
import './server/server';

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', console.error);
