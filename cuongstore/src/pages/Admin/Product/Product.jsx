import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Product.css";

// API Endpoint
const API_URL = "http://localhost:3000/api/products";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle Delete Product with confirmation and success notification
  const deleteProduct = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");

    if (isConfirmed) {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`${API_URL}/${id}`, config);

        fetchProducts();

        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product.");
      }
    }
  };

  const startEditing = (product) => {
    navigate(`/admin/edit-product/${product._id}`);
  };

  const handleAddProductClick = () => {
    navigate(`/admin/add-product`);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Product Management</h1>

      {/* Add Product Button */}
      <button onClick={handleAddProductClick} className="admin-button add-product-button">
        Add Product
      </button>

      {/* Products Table */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => startEditing(product)} className="edit-button">Edit</button>
                <button onClick={() => deleteProduct(product._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
