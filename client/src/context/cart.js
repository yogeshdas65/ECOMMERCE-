import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custome Hook
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useSearch must be used within an AuthProvider");
  }
  return context;
};

export { useCart, CartProvider };
