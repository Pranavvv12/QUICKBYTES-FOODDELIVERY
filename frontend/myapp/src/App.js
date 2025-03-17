import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import Appd from "./components/AppDownload/AppDownload";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { food_list } from "./pages/Cart/FoodList"; 
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || ""); 
  const location = useLocation();

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      if (itemInfo) {
        total += itemInfo.price * quantity;
      }
      return total;
    }, 0);
  };

  const hideFooterAndAppDownload = location.pathname === "/cart" || location.pathname === "/order";

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} setToken={setToken} />}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} token={token} setToken={setToken} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route
            path="/order"
            element={
              <PlaceOrder getTotalCartAmount={getTotalCartAmount} />
            }
          />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
        {!hideFooterAndAppDownload && <Appd />}
      </div>
      {!hideFooterAndAppDownload && <Footer />}
    </>
  );
};

export default App;
