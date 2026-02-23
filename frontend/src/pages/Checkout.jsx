import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("cart/")
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase()]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (!formData.address || !formData.city || !formData.pincode) {
      alert("Please fill all address fields ❌");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty ❌");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Save Address
      const addressRes = await axios.post("address/add/", formData);
      const addressId = addressRes.data.id;

      // 2️⃣ Demo Payment
      alert(`Payment Successful via ${paymentMethod} ✅ (Demo Mode)`);

      // 3️⃣ Create Order
      await axios.post("order/create/", {
        address: addressId,
        payment_method: paymentMethod,
      });

      alert("Order Placed Successfully 🎉");

      navigate("/orders");
    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Your cart is empty.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout</h2>

      <div className="row">

        {/* LEFT SIDE - ADDRESS */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h5>Delivery Address</h5>

            <input
              className="form-control mb-3"
              placeholder="Address"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="City"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="Pincode"
              onChange={handleChange}
            />

            <h5 className="mt-4">Payment Method</h5>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <label className="form-check-label">
                Cash on Delivery
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked={paymentMethod === "Demo Card"}
                onChange={() => setPaymentMethod("Demo Card")}
              />
              <label className="form-check-label">
                Demo Credit/Debit Card
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                type="radio"
                className="form-check-input"
                checked={paymentMethod === "Demo UPI"}
                onChange={() => setPaymentMethod("Demo UPI")}
              />
              <label className="form-check-label">
                Demo UPI
              </label>
            </div>

            <button
              className="btn btn-success w-100"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ₹${total}`}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h5>Order Summary</h5>

            {cart.map(item => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}

            <hr />

            <h5>Total: ₹{total}</h5>
          </div>
        </div>

      </div>
    </div>
  );
}