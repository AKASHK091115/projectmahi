// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom"; // ✅ import useParams

// const Cart = () => {
//   const { userId } = useParams(); // ✅ get dynamic userId from URL
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/cart/cart-state/${userId}`);
//         setCart(res.data.cart);
//       } catch (err) {
//         console.error("Could not load cart:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [userId]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <nav style={{ marginBottom: "20px" }}>
//         <Link to="/scan">← Back to Scanner</Link>
//       </nav>

//       <h2>Your Blockchain Cart</h2>

//       {loading && <p>Loading...</p>}

//       {!loading && cart.length === 0 && <p>Your cart is empty.</p>}

//       {!loading &&
//         cart.map((item, index) => (
//           <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
//             <p><strong>Product ID:</strong> {item.productId}</p>
//             <p><strong>Quantity:</strong> {item.quantity}</p>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Cart;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const Cart = () => {
  const { userId } = useParams();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [userId]);

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

  const updateQuantity = async (productId, action) => {
    try {
      await axios.post("http://localhost:3000/cart/addBlock", {
        userId,
        productId,
        action, // 'add' or 'remove'
        quantity: 1,
      });
      fetchCart(); // refresh cart after update
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  const handleBuy = () => {
    // 👉 For hackathon: just simulate payment or redirect
    alert("Proceeding to payment gateway... 🚀");
    navigate("/payment"); // if you have a Payment.js route
  };

  return (
    <div style={{ padding: "20px" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/scan">← Back to Scanner</Link>
      </nav>

      <h2>Wishlist</h2>

      {loading && <p>Loading...</p>}

      {!loading && cart.length === 0 && <p>Your cart is empty.</p>}

      {!loading &&
        cart.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p><strong>Product ID:</strong> {item.productId}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
            </div>
            <div>
              <button
                onClick={() => updateQuantity(item.productId, "add")}
                style={{ marginRight: "10px", padding: "5px 10px" }}
              >
                ➕
              </button>
              <button
                onClick={() => updateQuantity(item.productId, "remove")}
                style={{ padding: "5px 10px" }}
                disabled={item.quantity === 0}
              >
                ➖
              </button>
            </div>
          </div>
        ))}

      {!loading && cart.length > 0 && (
        <button
          onClick={handleBuy}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "orange",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          BUY NOW
        </button>
      )}
    </div>
  );
};

export default Cart;
