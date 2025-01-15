import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  );

  const addToCart = (ticket) => {
     console.log("Cart before adding:", cartItems);
    const isTicketInCart = cartItems.find(
      (cartItem) =>
        cartItem.id === ticket.id && cartItem.ticketType === ticket.ticketType
    );

    if (isTicketInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === ticket.id && cartItem.ticketType === ticket.ticketType
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...ticket, quantity: 1 }]);
    }
     console.log("Cart after adding:", cartItems);
  };

  const removeFromCart = (ticket) => {
    const isTicketInCart = cartItems.find(
      (cartItem) =>
        cartItem.id === ticket.id && cartItem.ticketType === ticket.ticketType
    );

    if (isTicketInCart.quantity === 1) {
      setCartItems(
        cartItems.filter(
          (cartItem) =>
            cartItem.id !== ticket.id || cartItem.ticketType !== ticket.ticketType
        )
      );
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === ticket.id && cartItem.ticketType === ticket.ticketType
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};