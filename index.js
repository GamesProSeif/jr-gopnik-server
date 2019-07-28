require('dotenv').config();
const mongoose = require('mongoose');
const { join } = require('path');

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
  require(join(__dirname, 'server', 'server.js'));
});

db.on('error', console.error);
