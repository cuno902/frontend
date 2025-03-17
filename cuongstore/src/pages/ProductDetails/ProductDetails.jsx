import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError("Product not found");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const handleAddToCart = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/cart/add",
                { productId: product._id, quantity },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } 
            );

            console.log(response.data.message);
            alert("Item added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data?.message || error.message);
            alert("Failed to add item to cart");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-container">
            <div className="product-details">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="product-price">${product.price.toFixed(2)}</p>
                
                {/* Quantity Selector */}
                <div className="quantity-selector">
                    <label>Quantity:</label>
                    <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
                </div>

                <button className="add-to-cart" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
            </div>
            <div className="product-description">
                <h2>Description</h2>
                <p>{product.description}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
