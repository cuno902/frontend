import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Product.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({ price: "", type: "", sortBy: "" });

    useEffect(() => {
       const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_LINK}/api/products`, {
                    params: {
                        type: filters.type || undefined,
                        sortBy: filters.sortBy || undefined,
                    },
                });

                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };


        const fetchProductTypes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_LINK}/api/types`);
                setProductTypes(response.data);
            } catch (error) {
                console.error("Error fetching product types:", error);
            }
        };

        fetchProducts();
        fetchProductTypes();
    }, [filters]);
    return (
        <div className="product-page">
            <aside className="filter-sidebar">
                <h3>Bộ lọc</h3>

                <label>Giá tối đa:</label>
                <input
                    type="number"
                    placeholder="Enter max price"
                    onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                />

                <label>Type:</label>
                <select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                    <option value="">All</option>
                    {productTypes.map((type) => (
                        <option key={type._id} value={type._id}>{type.name}</option>
                    ))}
                </select>

                <label>Sort By:</label>
                <select onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
                    <option value="">Không</option>
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                    <option value="lowToHigh">Giá: Thấp đến cao</option>
                    <option value="highToLow">Giá: Cao đến thấp</option>
                </select>
            </aside>

            <section className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>Không tìm thấy sản phẩm</p>
                )}
            </section>
        </div>
    );
};

export default ProductPage;
