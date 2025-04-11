import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate(); // Hook to navigate programmatically

    

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_LINK}/api/products/${id}`);
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
                `${import.meta.env.VITE_API_LINK}/api/cart/add`,
                { productId: product._id, quantity },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            console.log(response.data.message);
            alert("Sản phẩm đã được thêm vào giỏ");
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data?.message || error.message);
            alert("Thêm vào giỏ hàng không thành công");
        }
    };

    const handleBuyNow = () => {
        navigate("/payment", {  state: { 
            products: [{ product, quantity }] 
        }  });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-container">
            <div className="product-details">
                <img src={product.imageUrl} alt={product.name} className="product1-image" />
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="product-price">{new Intl.NumberFormat().format(product.price)}₫</p>
                    <p className="product-stock">Số lượng còn lại: {product.stock}</p>
                    
                    {/* Quantity Selector */}
                    <div className="quantity-selector">
                        <label>Số lượng:</label>
                        <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
                    </div>

                    <button className="add-to-cart" onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                    </button>

                    <button className="buy-now" onClick={handleBuyNow}>
                        Mua ngay
                    </button>
                </div>
            </div>
            <div className="product-description">
                <h2>Mô tả</h2>
                <p>{product.description}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
