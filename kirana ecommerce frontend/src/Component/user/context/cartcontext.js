import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // example structure
  const removeFromCart=(id)=>
  {
    setCartItems(cartItems.filter((item)=>(item._id !==id)))
  }
  return (
    <CartContext.Provider value={{ cartItems, setCartItems,removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
