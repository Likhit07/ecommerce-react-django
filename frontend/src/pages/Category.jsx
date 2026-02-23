import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Category() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [subcategories, setSubcategories] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedSub(null);
    setProducts([]);

    axios.get(`subcategories/${id}/`)
      .then(res => setSubcategories(res.data))
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    if (selectedSub) {
      setLoading(true);
      axios.get(`products/${selectedSub}/`)
        .then(res => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [selectedSub]);

  const addToCart = async (productId) => {
    try {
      await axios.post("cart/add/", { product: productId, quantity: 1 });
      alert("Added to Cart ✅");
    } catch {
      alert("Please login first ❌");
    }
  };

  const buyNow = async (productId) => {
    try {
      await axios.post("cart/add/", { product: productId, quantity: 1 });
      navigate("/checkout");
    } catch {
      alert("Please login first ❌");
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axios.post("wishlist/add/", { product: productId });
      alert("Added to Wishlist ❤️");
    } catch {
      alert("Please login first ❌");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">Products</h2>

      {/* Subcategories */}
      <div className="text-center mb-4">
        {subcategories.map(sub => (
          <button
            key={sub.id}
            className={`btn me-2 mb-2 ${selectedSub === sub.id ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setSelectedSub(sub.id)}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {loading && <p className="text-center">Loading...</p>}

      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
  <div className="card product-card h-100 shadow">

    <img
      src={`http://127.0.0.1:8000${product.image}`}
      className="card-img-top"
      alt={product.name}
      style={{ height: "250px", objectFit: "cover" }}
    />

    <div className="card-body d-flex flex-column">
      <h5>{product.name}</h5>
      <p className="fw-bold text-danger fs-5">₹{product.price}</p>

      <div className="mt-auto d-grid gap-2">
        <button className="btn btn-dark"
          onClick={() => addToCart(product.id)}>
          Add to Cart
        </button>

        <button className="btn btn-success"
          onClick={() => buyNow(product.id)}>
          Buy Now
        </button>

        <button className="btn btn-outline-danger"
          onClick={() => addToWishlist(product.id)}>
          ❤️ Wishlist
        </button>
      </div>
    </div>

  </div>
</div>
        ))}
      </div>

      {!loading && selectedSub && products.length === 0 && (
        <p className="text-center mt-4">No products available.</p>
      )}
    </div>
  );
}