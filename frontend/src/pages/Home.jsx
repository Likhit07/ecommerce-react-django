import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();

  const images = [
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero-container d-flex justify-content-center align-items-center text-center"
      style={{
        height: "100vh",
        backgroundImage: `url(${images[current]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Hero Content */}
      <div className="hero-content" align="center">

        <h1 className="fw-bold mb-3">
          Discover Your Style
        </h1>

        <p className="lead mb-4">
          Premium Fashion for Men, Women & Kids
        </p>

        
        

      </div>

      <style>
        {`
        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.55);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          color: white;
          max-width: 700px;
        }

        .hero-content h1 {
          font-size: 3rem;
        }

        .shop-btn {
          background-color: #ff3f6c;
          color: white;
          padding: 10px 30px;
          border-radius: 30px;
          border: none;
          font-weight: 600;
          transition: 0.3s ease;
        }

        .shop-btn:hover {
          background-color: white;
          color: #ff3f6c;
          transform: scale(1.1);
        }

        .trending-wrapper {
          margin-top: 20px;
        }

        .category-btn {
          background: white;
          color: #111;
          border: none;
          padding: 10px 25px;
          border-radius: 25px;
          font-weight: 500;
          transition: 0.3s ease;
        }

        .category-btn:hover {
          background-color: #ff3f6c;
          color: white;
          transform: translateY(-3px);
        }

        `}
      </style>
    </div>
  );
}