import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

export default function ProductCard({ product, refreshCart }) {

  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const addToCart = async () => {
    try {
      setLoadingCart(true);
      await axios.post("cart/add/", {
        product: product.id,
        quantity: 1
      });
      alert("Added to Cart 🛒");
      if (refreshCart) refreshCart();
    } catch {
      alert("Login required");
    } finally {
      setLoadingCart(false);
    }
  };

  const addToWishlist = async () => {
    try {
      setLoadingWishlist(true);
      await axios.post("wishlist/add/", {
        product: product.id
      });
      alert("Added to Wishlist ❤️");
    } catch {
      alert("Login required");
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 overflow-hidden">

      {/* Product Image */}
      <div className="relative">
        <img
          src={
            product.image
              ? `http://127.0.0.1:8000${product.image}`
              : "https://via.placeholder.com/300"
          }
          alt={product.name}
          className="h-64 w-full object-cover"
        />

        {/* Wishlist Button */}
        <button
          onClick={addToWishlist}
          disabled={loadingWishlist}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition"
        >
          ❤️
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">

        <h3 className="text-lg font-semibold truncate">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-black">
            ₹{product.price}
          </span>

          {/* Fake Rating Display */}
          <span className="text-yellow-500 text-sm">
            ⭐ 4.5
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={addToCart}
            disabled={loadingCart}
            className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loadingCart ? "Adding..." : "Add to Cart"}
          </button>

          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition text-center"
          >
            View
          </Link>
        </div>

      </div>
    </div>
  );
}