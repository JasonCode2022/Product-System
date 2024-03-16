const Product = require('../models/Product');



exports.createProduct = async (req, res) => {
  
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
};

exports.getAllProducts = async (req, res) => {
 
    const products = await Product.find();
    res.json(products);
};

exports.updateProduct = async (req, res) => {
  
    const productId = req.params.productId;
    const updateData = req.body;

    
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found to update!' });
    }

    res.status(200).json({ message: 'Product updated successfully', updatedProduct });
  
};

exports.deleteProduct = async (req, res) => {
    
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found to delete it!!' });
      }
      await Product.findByIdAndDelete(req.params.productId);
      res.json({ message: 'Product deleted successfully' });
  };
