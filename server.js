const mongoose = require('mongoose');
const dotenv = require('dotenv');


process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});


dotenv.config({ path: './.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
    'PASSWORD', 
    process.env.DATABASE_PASSWORD);
console.log(DB);
// Modern connection without deprecated options
mongoose.connect(DB)
  .then(con => {
    console.log('DB connection successful');
  })
  .catch(err => {
    console.error('DB connection error:', err.message);
    });


const port = process.env.PORT || 3000; // Note: PORT is now uppercase to match your env file
// console.log(URL)

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});