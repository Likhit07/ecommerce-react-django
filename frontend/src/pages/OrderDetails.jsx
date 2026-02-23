import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`orders/${id}/`)
      .then(res => setOrder(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!order) {
    return (
      <div className="container mt-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Details</h2>

      <div className="card p-4 shadow-sm mb-4">
        <h5>Order #{order.id}</h5>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment:</strong> {order.payment_method}</p>
        <p><strong>Total:</strong> ₹{order.total_amount}</p>
        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <div className="card p-4 shadow-sm">
        <h5>Ordered Products</h5>

        {order.items.map(item => (
          <div
            key={item.id}
            className="d-flex justify-content-between border-bottom py-2"
          >
            <div>
              <strong>{item.product_name}</strong>
              <p className="mb-0">Quantity: {item.quantity}</p>
            </div>

            <div>
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}