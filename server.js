const mongoose = require('mongoose');
const dotenv = require('dotenv');
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
    console.error('DB connection error:', err);
  });

const port = process.env.PORT || 3000; // Note: PORT is now uppercase to match your env file
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});