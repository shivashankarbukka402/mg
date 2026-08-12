import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('medstore_cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('medstore_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (medicine, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === medicine._id);
      if (existing) {
        return prev.map((item) =>
          item._id === medicine._id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...medicine, quantity: qty }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, totalAmount, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
