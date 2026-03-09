import 'antd/dist/reset.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Homepage from './Pages/Homepage';
import Itempage from './Pages/Itempage';
import Billpage from './Pages/BillPage';
import Customerspage from './Pages/Customerpage';
import Supplierspage from './Pages/Supplierpage';
import Reportspage from './Pages/Reportpage';
import Settingspage from './Pages/Settingpage';
import Helppage from './Pages/Helppage';
import Logoutpage from './Pages/Logoutpage';
import { PosContext } from './context';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const refreshItems = useCallback(async () => {
    const { data } = await axios.get('/api/items/getitem');
    setItems(data);
  }, []);

  useEffect(() => {
    refreshItems().catch((error) => {
      console.error('Unable to load items:', error);
    });
  }, [refreshItems]);

  const addToCart = useCallback((item) => {
    setCartItems((prev) => {
      const existing = prev.find((entry) => entry._id === item._id);
      if (existing) {
        return prev.map((entry) =>
          entry._id === item._id ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => {
      const existing = prev.find((entry) => entry._id === itemId);
      if (!existing) {
        return prev;
      }
      if (existing.quantity === 1) {
        return prev.filter((entry) => entry._id !== itemId);
      }
      return prev.map((entry) =>
        entry._id === itemId ? { ...entry, quantity: entry.quantity - 1 } : entry,
      );
    });
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const contextValue = useMemo(
    () => ({ items, cartItems, addToCart, removeFromCart, clearCart, refreshItems }),
    [items, cartItems, addToCart, removeFromCart, clearCart, refreshItems],
  );

  return (
    <PosContext.Provider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/items" element={<Itempage />} />
          <Route path="/bills" element={<Billpage />} />
          <Route path="/customers" element={<Customerspage />} />
          <Route path="/suppliers" element={<Supplierspage />} />
          <Route path="/reports" element={<Reportspage />} />
          <Route path="/settings" element={<Settingspage />} />
          <Route path="/help" element={<Helppage />} />
          <Route path="/logout" element={<Logoutpage />} />
        </Routes>
      </BrowserRouter>
    </PosContext.Provider>
  );
}

export default App;
