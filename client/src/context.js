import { createContext } from 'react';

export const PosContext = createContext({
  items: [],
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  refreshItems: async () => {},
});
