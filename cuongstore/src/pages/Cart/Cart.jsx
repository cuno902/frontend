import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./Cart.css";

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_LINK}/api/cart`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setCart(response.data);
            } catch (error) {
                setError("Failed to load cart");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleUpdateQuantity = async (productId, newQuantity) => {
    newQuantity = Number(newQuantity);
    if (isNaN(newQuantity) || newQuantity < 1) {
        alert("Invalid quantity");
        return;
    }

    try {
        await axios.post(
            `${import.meta.env.VITE_API_LINK}/api/cart/update`,
            { productId, quantity: newQuantity },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        setCart((prevCart) => ({
            ...prevCart,
            items: prevCart.items.map((item) =>
                item.productId._id === productId ? { ...item, quantity: newQuantity } : item
            ),
        }));
    } catch (error) {
        console.error("Error updating quantity:", error.response?.data?.message || error.message);
    }
};


    const handleRemove = async (productId) => {
        try {
            await axios.post(
               `${import.meta.env.VITE_API_LINK}/api/cart/remove`,
                { productId },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setCart((prevCart) => ({
                ...prevCart,
                items: prevCart.items.filter((item) => item.productId._id !== productId),
            }));
        } catch (error) {
            console.error("Error removing item:", error.response?.data?.message || error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>;

    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cart.items.map((item) => (
                    <div key={item._id} className="cart-item">
                        {/* Clickable image */}
                        <img
                            src={item.productId.imageUrl}
                            alt={item.productId.name}
                            className="cart-item-image"
                            onClick={() => navigate(`/product/${item.productId._id}`)} 
                            style={{ cursor: "pointer" }} 
                        />
                        <div className="item-details">
                            <h3>{item.productId.name}</h3>
                            <p>${item.productId.price.toFixed(2)}</p>
                            <div className="quantity-control">
                                <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}>+</button>
                            </div>
                        </div>
                        <button className="remove-btn" onClick={() => handleRemove(item.productId._id)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <h2>Total: ${totalPrice}</h2>
            </div>
        </div>
    );
};

export default CartPage;
