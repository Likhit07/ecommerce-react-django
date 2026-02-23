import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = () => {
    axios.get("wishlist/")
      .then(res => setWishlist(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h2>Your Wishlist ❤️</h2>

      {wishlist.map(item => (
        <div key={item.id} className="card p-3 mb-3">
          <h5>{item.product.name}</h5>
          <p>₹{item.product.price}</p>
        </div>
      ))}
    </div>
  );
}