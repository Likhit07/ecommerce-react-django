import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get("orders/")
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.patch(`orders/${id}/cancel/`);
      alert("Order cancelled successfully ❌");
      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Unable to cancel order");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";
      case "Shipped":
        return "bg-info";
      case "Delivered":
        return "bg-success";
      case "Cancelled":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order History</h2>

      {orders.length === 0 && (
        <div className="alert alert-info">
          No orders found.
        </div>
      )}

      {orders.map(order => (
        <div key={order.id} className="card p-4 mb-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">Order #{order.id}</h5>
            <span className={`badge ${getStatusBadge(order.status)}`}>
              {order.status}
            </span>
          </div>

          <p className="mb-1">
            <strong>Total:</strong> ₹{order.total_amount}
          </p>

          <p className="mb-1">
            <strong>Payment:</strong> {order.payment_method}
          </p>

          <p className="text-muted mb-3">
            {new Date(order.created_at).toLocaleString()}
          </p>

          <div className="d-flex gap-2">
            <button
              className="btn btn-dark btn-sm"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              View Details
            </button>

            {order.status === "Pending" && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => cancelOrder(order.id)}
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}