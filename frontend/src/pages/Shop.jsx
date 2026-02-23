import { useState, useEffect } from "react";
import axios from "../api/axios";
import "./Shop.css";

export default function Shop() {
  const [categories] = useState([
    { id: 1, name: "Men" },
    { id: 2, name: "Women" },
    { id: 3, name: "Kids" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`subcategories/${selectedCategory}/`)
      .then(res => {
        setSubcategories(res.data);
        setSelectedSub(null);
        setProducts([]);
      })
      .catch(err => console.log(err));
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSub) {
      axios.get(`products/${selectedSub}/`)
        .then(res => setProducts(res.data))
        .catch(err => console.log(err));
    }
  }, [selectedSub]);

  const addToCart = async (productId) => {
    try {
      await axios.post("cart/add/", {
        product: productId,
        quantity: 1,
      });
      alert("Added to cart ✅");
    } catch (err) {
      alert("Login required ❌");
    }
  };

  return (
    <div className="shop-wrapper">

      {/* CATEGORY TABS */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`tab-btn ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* SUBCATEGORY PILLS */}
      <div className="subcategory-bar">
        {subcategories.map(sub => (
          <div
            key={sub.id}
            className={`subcategory-pill ${selectedSub === sub.id ? "active" : ""}`}
            onClick={() => setSelectedSub(sub.id)}
          >
            {sub.name}
          </div>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">

            <div className="img-wrapper">
              <img
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.name}
              />
            </div>

            <div className="product-info">
              <h6>{product.name}</h6>
              <p>₹{product.price}</p>

              <button
                className="add-btn"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>

      {selectedSub && products.length === 0 && (
        <p className="no-products">No products available</p>
      )}

    </div>
  );
}