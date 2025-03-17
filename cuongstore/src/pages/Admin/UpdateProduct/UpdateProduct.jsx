import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateProduct.css";

const API_URL = `${import.meta.env.VITE_API_LINK}/api/products`;
const TYPE_API_URL = `${import.meta.env.VITE_API_LINK}/api/types`;

const UpdateProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [productTypes, setProductTypes] = useState([]);
  const [product, setProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductTypes();
    fetchProduct();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const res = await axios.get(TYPE_API_URL);
      setProductTypes(res.data);
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setProduct(res.data);
      Object.keys(res.data).forEach((key) => setValue(key, res.data[key]));


      if (res.data.imageUrl) {
        setPreviewImage(res.data.imageUrl);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
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


      await axios.put(`${API_URL}/${id}`, formData, config);

      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="admin-container">
      <h1 className="admin-title">Update Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form" encType="multipart/form-data">
        <input {...register("name")} placeholder="Product Name" className="admin-input" required />
        <input {...register("description")} placeholder="Description" className="admin-input" required />
        <input {...register("price")} placeholder="Price" type="number" className="admin-input" required />
        <input {...register("material")} placeholder="Material" className="admin-input" required />
        <input {...register("weight")} placeholder="Weight (g)" type="number" className="admin-input" required />
        <input {...register("stock")} placeholder="Stock" type="number" className="admin-input" required />
        <select {...register("type")} className="admin-input" required>
          <option value="">Select Product Type</option>
          {productTypes.map((type) => (
            <option key={type._id} value={type._id}>{type.name}</option>
          ))}
        </select>


        {previewImage && (
          <div>
            <img src={previewImage} alt="Product" className="image-preview" />
          </div>
        )}

        <input {...register("image")} type="file" className="admin-input" accept="image/*" onChange={handleImageChange} />

        <button type="submit" className="admin-button">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
