import React from "react";
import { useCart } from "../user/context/cartcontext";
import emptyCartImg from "../user/empty-cart.png"

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems } = useCart();

  return (
   <div className={`sidebar cart-sidebar${isOpen ? " open" : ""}`}>
      <div className="sidebar-header">
        <span>SHOPPING CART</span>
        <button onClick={onClose} aria-label="Close cart sidebar">&times;</button>
      </div>
      <div className="sidebar-content">
        {cartItems.length === 0 ? (
          <div className="cart-empty-state">
            <img src={emptyCartImg} alt="Empty cart" />
            <p>Your Cart is empty</p>
            <a className="cart-shop-btn" href="/shop">Go To Shop</a>
            <div className="cart-summary">
              <div className="cart-subtotal">
                <span>Subtotal:</span>
                <span className="subtotal-amount">$0.00</span>
              </div>
              <button className="cart-action-btn" disabled>View Cart</button>
              <button className="cart-action-btn" disabled>Checkout</button>
            </div>
          </div>
        ) : (
          // Map items and show subtotal/buttons here
          <div>/* Render cart items and actions here */</div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
