import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios.get("cart/")
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  };

  const removeItem = async (id) => {
    await axios.delete(`cart/remove/${id}/`);
    fetchCart();
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    await axios.patch(`cart/update/${id}/`, { quantity });
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 && (
        <div className="alert alert-info">Your cart is empty.</div>
      )}

      {cart.map(item => (
        <div key={item.id} className="card mb-3 shadow-sm p-3">
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h5>{item.product.name}</h5>
              <p>₹{item.product.price}</p>
            </div>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>

              <span className="mx-3">{item.quantity}</span>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div>
              <p className="fw-bold">
                ₹{item.product.price * item.quantity}
              </p>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>

          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="text-end">
          <h4>Total: ₹{total}</h4>

          <button
            className="btn btn-success mt-2"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
