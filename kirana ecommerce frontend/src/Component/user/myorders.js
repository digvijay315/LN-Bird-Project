import React from "react";
import Header from "./header";

const dummyOrders = [
  {
    id: "ORD123456",
    date: "2025-07-15",
    status: "Delivered",
    items: [
      { name: "Product A", quantity: 1, price: 499 },
      { name: "Product B", quantity: 2, price: 299 },
    ],
    totalAmount: 1097,
  },
  {
    id: "ORD123457",
    date: "2025-07-10",
    status: "Shipped",
    items: [
      { name: "Product C", quantity: 1, price: 799 },
    ],
    totalAmount: 799,
  },
  {
    id: "ORD123458",
    date: "2025-07-01",
    status: "Processing",
    items: [
      { name: "Product D", quantity: 3, price: 199 },
      { name: "Product E", quantity: 1, price: 999 },
    ],
    totalAmount: 1596,
  },
];

const statusColors = {
  Delivered: "#2a9d8f",
  Shipped: "#f4a261",
  Processing: "#e76f51",
  Cancelled: "#d62828",
};

const MyOrders = () => {
  return (
    <>
    <Header/>
    <div className="orders-container">
      <h2>My Orders</h2>
      {dummyOrders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        dummyOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order ID: {order.id}</span>
              <span className="order-date">Date: {new Date(order.date).toLocaleDateString()}</span>
              <span
                className="order-status"
                style={{ backgroundColor: statusColors[order.status] || "#888" }}
              >
                {order.status}
              </span>
            </div>
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">Qty: {item.quantity}</span>
                  <span className="item-price">₹{item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-total">
              Total Amount: <strong>₹{order.totalAmount.toFixed(2)}</strong>
            </div>
          </div>
        ))
      )}
      <style jsx>{`
        .orders-container {
          max-width: 720px;
          margin: 24px auto;
          padding: 16px 24px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 24px;
          color: #222b45;
          font-weight: 700;
        }

        .no-orders {
          text-align: center;
          color: #666;
          font-size: 1.1rem;
          margin-top: 40px;
        }

        .order-card {
          border: 1px solid #ececec;
          border-radius: 6px;
          padding: 16px 20px;
          margin-bottom: 20px;
          transition: box-shadow 0.3s ease;
        }

        .order-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .order-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          gap: 8px;
        }

        .order-id, .order-date {
          font-weight: 600;
          font-size: 0.95rem;
          color: #333;
        }

        .order-status {
          padding: 4px 12px;
          border-radius: 20px;
          color: #fff;
          font-weight: 600;
          font-size: 0.85rem;
          white-space: nowrap;
        }

        .order-items {
          border-top: 1px solid #f0f0f0;
          padding-top: 12px;
          margin-bottom: 12px;
        }

        .order-item {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f7f7f7;
          padding: 8px 0;
          font-size: 0.95rem;
          color: #444;
        }

        .order-item:last-child {
          border-bottom: none;
        }

        .item-name {
          flex: 2;
        }

        .item-qty {
          flex: 1;
          text-align: center;
        }

        .item-price {
          flex: 1;
          text-align: right;
          font-weight: 600;
        }

        .order-total {
          text-align: right;
          font-size: 1.05rem;
          font-weight: 700;
          color: #222b45;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .order-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .order-item {
            flex-direction: column;
            gap: 4px;
            font-size: 1rem;
          }

          .item-qty, .item-price {
            text-align: left;
          }

          .order-total {
            text-align: left;
            margin-top: 8px;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
    </>
  );
};

export default MyOrders;
