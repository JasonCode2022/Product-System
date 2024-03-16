// cnx to mongoDb
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://jasonjeanishac13:6bOyThIhiY3F7xhM@product-system-001.wojp5to.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose;
