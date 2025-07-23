import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // ✅ import useParams

const Cart = () => {
  const { userId } = useParams(); // ✅ get dynamic userId from URL
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/cart/cart-state/${userId}`);
        setCart(res.data.cart);
      } catch (err) {
        console.error("Could not load cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  return (
    <div style={{ padding: "20px" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">← Back to Scanner</Link>
      </nav>

      <h2>Your Blockchain Cart</h2>

      {loading && <p>Loading...</p>}

      {!loading && cart.length === 0 && <p>Your cart is empty.</p>}

      {!loading &&
        cart.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <p><strong>Product ID:</strong> {item.productId}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
          </div>
        ))}
    </div>
  );
};

export default Cart;
