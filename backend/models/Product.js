const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  fullName: String,
  merchantEmail: String,
  store: String,
});


const Product = mongoose.model('Product', productSchema);


module.exports = Product;
