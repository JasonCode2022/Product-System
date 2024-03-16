import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'select2';


function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editedProducts, setEditedProducts] = useState({});
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProductData, setNewProductData] = useState({
    fullName: '',
    merchantEmail: '',
    store: ''
  });

  const stores = ['Batroun', 'Beirut', 'Tripoli'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product/list');
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (productId) => {
    setEditedProducts({ ...editedProducts, [productId]: { ...products.find(product => product._id === productId) } });
  };

  const handleSaveEdit = async (productId) => {
    try {
      await axios.put(`http://localhost:3000/api/product/update/${productId}`, editedProducts[productId]);
      setProducts(products.map(product => {
        if (product._id === productId) {
          return { ...product, ...editedProducts[productId] };
        }
        return product;
      }));

      setEditedProducts({ ...editedProducts, [productId]: null });
    } catch (error) {
      console.error('Error saving product edit:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/product/delete/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleInputChange = (productId, field, value) => {
    setEditedProducts({
      ...editedProducts,
      [productId]: {
        ...editedProducts[productId],
        [field]: value,
      },
    });
  };

  const handleAddProduct = () => {
    setIsAddingProduct(true);
  };

  const handleCancelAddProduct = () => {
    setIsAddingProduct(false);
  };

  const handleInputChangeNewProduct = (field, value) => {
    setNewProductData({
      ...newProductData,
      [field]: value,
    });
  };

  const handleSaveNewProduct = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/product/create', newProductData);
      setProducts([...products, response.data]);
      setIsAddingProduct(false);
      setNewProductData({
        fullName: '',
        merchantEmail: '',
        store: ''
      });
    } catch (error) {
      console.error('Error adding new product:', error);
    }
  };

  return (
    <div>
      <h1>Product Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Merchant Email</th>
                <th>Store</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    {editedProducts[product._id] ? (
                      <input
                        type="text"
                        placeholder={product.fullName}
                        value={editedProducts[product._id].fullName}
                        onChange={(e) => handleInputChange(product._id, 'fullName', e.target.value)}
                      />
                    ) : product.fullName}
                  </td>
                  <td>
                    {editedProducts[product._id] ? (
                      <input
                        type="text"
                        placeholder={product.merchantEmail}
                        value={editedProducts[product._id].merchantEmail}
                        onChange={(e) => handleInputChange(product._id, 'merchantEmail', e.target.value)}
                      />
                    ) : product.merchantEmail}
                  </td>
                  <td>
                    {editedProducts[product._id] ? (
                      <input
                        type="text"
                        placeholder={product.store}
                        value={editedProducts[product._id].store}
                        onChange={(e) => handleInputChange(product._id, 'store', e.target.value)}
                      />
                    ) : product.store}
                  </td>
                  <td>
                    {editedProducts[product._id] ? (
                      <>
                        <button onClick={() => handleSaveEdit(product._id)}>Save</button>
                        <button onClick={() => setEditedProducts({ ...editedProducts, [product._id]: null })}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(product._id)}>Edit</button>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={handleAddProduct}>Add Product</button>
          </div>
          {isAddingProduct && (
            <div>
              <input
                type="text"
                placeholder="Product Name"
                value={newProductData.fullName}
                onChange={(e) => handleInputChangeNewProduct('fullName', e.target.value)}
              />
              <input
                type="text"
                placeholder="Merchant Email"
                value={newProductData.merchantEmail}
                onChange={(e) => handleInputChangeNewProduct('merchantEmail', e.target.value)}
              />
              <select
                value={newProductData.store}
                onChange={(e) => handleInputChangeNewProduct('store', e.target.value)}
                className="select2"
              >
                <option value="">Select Store</option>
                {stores.map((store, index) => (
                  <option key={index} value={store}>{store}</option>
                ))}
              </select>
              <button onClick={handleSaveNewProduct}>Save</button>
              <button onClick={handleCancelAddProduct}>Cancel</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductPage;
