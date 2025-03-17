import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product._id}`);
    };

    const handleAddToCart = async (event) => {
        event.stopPropagation(); 

        try {
            const response = await axios.post(
                "http://localhost:3000/api/cart/add",
                { productId: product._id, quantity : 1 },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } 
            );

            console.log(response.data.message);
            alert("Item added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data?.message || error.message);
            alert("Failed to add item to cart");
        }
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button className="add-to-cart" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
