import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      axios.get("cart/")
        .then(res => setCartCount(res.data.length))
        .catch(() => setCartCount(0));
    }
  }, [token]);

  // Sticky shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar-modern ${scrolled ? "navbar-shadow" : ""}`}>
      
      {/* Logo */}
      <Link to="/" className="logo">
        FASHION
      </Link>

      {/* Links */}
      <div className="nav-links">
        <Link
          to="/shop"
          className={`nav-item ${location.pathname === "/shop" ? "active" : ""}`}
        >
          Shop
        </Link>

        <Link
          to="/wishlist"
          className="nav-item"
        >
          Wishlist
        </Link>

        <Link
          to="/cart"
          className="nav-item cart-icon"
        >
          Cart
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>
      </div>

      {/* Auth Button */}
      <div>
        {!token ? (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        ) : (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}
      </div>

      {/* Styles */}
      <style>
        {`

        .navbar-modern {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 40px;
          z-index: 1000;
          transition: 0.3s ease;
        }

        .navbar-shadow {
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .logo {
          font-weight: 800;
          font-size: 1.4rem;
          text-decoration: none;
          color: #111;
          letter-spacing: 2px;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-item {
          position: relative;
          text-decoration: none;
          color: #111;
          font-weight: 500;
          transition: 0.3s;
        }

        /* 🔥 Underline animation */
        .nav-item::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          background: #ff3f6c;
          left: 0;
          bottom: -5px;
          transition: 0.3s ease;
        }

        .nav-item:hover::after {
          width: 100%;
        }

        .active::after {
          width: 100%;
        }

        /* 🔥 Cart badge */
        .cart-icon {
          position: relative;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -12px;
          background: #ff3f6c;
          color: white;
          font-size: 12px;
          padding: 3px 6px;
          border-radius: 50%;
        }

        /* 🔥 Animated Login Button */
        .login-btn {
          background: #ff3f6c;
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: 0.3s ease;
        }

        .login-btn:hover {
          background: #111;
          transform: translateY(-2px);
        }

        .logout-btn {
          background: #111;
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          border: none;
          font-weight: 600;
          transition: 0.3s ease;
        }

        .logout-btn:hover {
          background: #ff3f6c;
          transform: translateY(-2px);
        }

        `}
      </style>
    </nav>
  );
}