import React, { useContext } from 'react';
import './Cart.css';
import {useNavigate } from "react-router-dom";

import emptyic from  '../../images/empty.png'; 
import { StoreContext } from '../../context/StoreContext'; 

const Cart = () => {
  const { url,food_list,cartItems, addToCart, removeFromCart,getTotalCartAmount} = useContext(StoreContext); 
  const navigate=useNavigate();
 
  const isCartEmpty = Object.values(cartItems).every((quantity) => quantity === 0);

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 19;
  const totalPayable = getTotalCartAmount() + deliveryFee;
  return (
    <div className="cart">
      {isCartEmpty ? (
        <div className="cart-empty">
          <img
            src={emptyic}
            alt="Empty Cart"
            className="cart-empty-image"
          />
          <p className="cart-empty-text">Your cart is empty</p>
          <p className='cart-para'>You can go to home page to view more restaurants</p>
          <button
  className="cart-button"
  onClick={() => {
    navigate("/"); 
    setTimeout(() => {
      const exploreMenuSection = document.getElementById("explore-menu");
      if (exploreMenuSection) {
        exploreMenuSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }}
>
  See Restaurants near you
</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            <div className="cart-header">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index} className="cart-item-row">
                   <img src={`${url}/images/${item.image}`} alt={item.name} onError={(e) => e.target.src = 'fallback_image.png'} />

                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <button onClick={() => removeFromCart(item._id)}>x</button>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="cart-summary">
            <h2>Cart Totals</h2>
            <div className="summary-row">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="summary-row">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="summary-row">
              <p>Total</p>
              <p>₹{totalPayable}</p>
            </div>
            <button onClick={()=> navigate("/order")}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;