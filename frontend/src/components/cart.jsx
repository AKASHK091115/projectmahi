// Cart.js
import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  // ✅ Step 1: Get userId from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setUserId(Number(storedId)); // 🔥 Fix: Convert string to number if your backend expects number
    } else {
      alert("No user ID found. Please login again.");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Step 2: Fetch cart when userId is ready
  useEffect(() => {
    if (userId !== null) {
      fetchCart();
    }
  }, [userId]);

  // ✅ Step 3: Fetch Cart Data
  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/cart/${userId}`);
      setCartItems(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ Step 4: Delete Item
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8081/cart/${userId}/${productId}`);
      fetchCart(); // refresh cart after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // ✅ Step 5: Table Columns
  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.productId)}
        />
      ),
    },
  ];

  return (
    <div>
      <h2>🛒 Your Cart</h2>
      <Table
        columns={columns}
        dataSource={cartItems}
        rowKey="productId"
        pagination={false}
      />
    </div>
  );
};

export default Cart;
