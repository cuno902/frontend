import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";

const API_URL = "http://localhost:3000/api/products";
const TYPE_API_URL = "http://localhost:3000/api/types";

const CreateProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [productTypes, setProductTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductTypes();
  }, []);

  // Fetch product types
  const fetchProductTypes = async () => {
    try {
      const res = await axios.get(TYPE_API_URL);
      console.log("Fetched product types:", res.data); // Log data to verify
      setProductTypes(res.data);
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

    
      const token = localStorage.getItem("token");

     
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, 
        },
      };

  
      await axios.post(API_URL, formData, config);

     
      reset();

     
      alert("Product created successfully!");

      
      navigate("/admin/products");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Create New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form" encType="multipart/form-data">
        <input {...register("name")} placeholder="Product Name" className="admin-input" required />
        <input {...register("description")} placeholder="Description" className="admin-input" required />
        <input {...register("price")} placeholder="Price" type="number" className="admin-input" required />
        <input {...register("material")} placeholder="Material" className="admin-input" required />
        <input {...register("weight")} placeholder="Weight (g)" type="number" className="admin-input" required />
        <input {...register("stock")} placeholder="Stock" type="number" className="admin-input" required />

        {/* Product Type Dropdown */}
        <select {...register("type")} className="admin-input" required>
          <option value="">Select Product Type</option>
          {productTypes && productTypes.length > 0 ? (
            productTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))
          ) : (
            <option disabled>No product types available</option>
          )}
        </select>

        <input {...register("image")} type="file" className="admin-input" accept="image/*" />
        <button type="submit" className="admin-button">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
