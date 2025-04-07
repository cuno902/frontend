import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
    const { state } = useLocation(); // Retrieve the state passed from CartPage
    const { products } = state || {}; // Destructure the array of products

    const [formData, setFormData] = useState({
        address: "",
        city: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.address || !formData.city) {
            setError("Hãy điền tất cả thông tin");
            return;
        }

        const totalPrice = products.reduce(
            (total, product) => total + product.product.price * product.quantity,
            0
        );

        setSuccess(`Đơn hàng đã được xác nhận. Tổng: ${new Intl.NumberFormat().format(totalPrice)}₫`);
        setError(null);
    };

    if (!products || products.length === 0) return <p>Không có sản phẩm nào để thanh toán</p>;

    const totalPrice = products.reduce(
        (total, product) => total + product.product.price * product.quantity,
        0
    );

    return (
        <div className="payment-page-container">
            <h2>Xác nhận đơn hàng của bạn</h2>
            {products.map((product, index) => (
                <div key={index} className="product-info">
                    <img src={product.product.imageUrl} alt={product.product.name} className="product-image" />
                    <ul>
                        <li>{product.product.name}</li>
                        <li>Giá: {new Intl.NumberFormat().format(product.product.price)}₫</li>
                        <li>Số lượng: {product.quantity}</li>
                        <li><strong>Total: {new Intl.NumberFormat().format(product.product.price * product.quantity)}₫</strong></li>
                    </ul>
                </div>
            ))}

            <h3>Địa chỉ ship hàng</h3>
            <form onSubmit={handleSubmit}>
                <label>Địa chỉ:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <label>Thành phố:</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <button type="submit">Xác nhận mua</button>
            </form>

            <div className="order-summary">
                <h3>Tổng tiền: {new Intl.NumberFormat().format(totalPrice)}₫</h3>
            </div>
        </div>
    );
};

export default PaymentPage;
