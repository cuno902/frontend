import { useState, useEffect } from "react";
import "./Latest.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const Latest = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
    const fetchLatest = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching best sellers:", error);
        }
    };

    fetchLatest();
}, []);


    return (
        <div className="best-sellers">
            <h1>Hàng mới nhất</h1>
            <div className="products-grid">
                {products.length > 0 ? (
                    products.map((product) => <ProductCard key={product._id} product={product} />)
                ) : (
                    <p>Không có sản phẩm</p>
                )}
            </div>
        </div>
    );
};

export default Latest;
