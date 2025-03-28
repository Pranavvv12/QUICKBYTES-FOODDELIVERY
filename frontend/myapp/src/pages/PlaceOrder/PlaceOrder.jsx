import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    companysname: "",
    name: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2; 
  const totalPayable = getTotalCartAmount() + deliveryFee; 

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (
      !data.name ||
      !data.phone ||
      !data.pincode ||
      !data.address ||
      !data.city ||
      !data.state
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: totalPayable,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const { order_id, amount, currency } = response.data;

        // Razorpay payment options
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
          amount: amount,
          currency: currency,
          name: "Food Delivery",
          description: "Payment for your order",
          order_id: order_id,
          handler: async (response) => {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
              response;

            // Verify payment on the backend
            const verifyResponse = await axios.post(`${url}/api/order/verify`, {
              orderId: razorpay_order_id,
              paymentId: razorpay_payment_id,
              signature: razorpay_signature,
            });

            if (verifyResponse.data.success) {
              toast.success("Order placed successfully!");
              navigate("/myorders");
            } else {
              toast.error("Payment verification failed");
              navigate("/");
            }
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } else {
        toast.error("Error placing order");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      toast.error("Please add items to cart");
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      
      <div className="place-order-left">
        <p className="title">Add Shipping Address</p>
        <input
          name="companysname"
          onChange={onChangeHandler}
          value={data.companysname}
          type="text"
          placeholder="Company's Name (Optional)"
        />
        <div className="multi-fields">
          <input
            required
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Name"
          />
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone Number"
          />
        </div>
        <input
          required
          name="pincode"
          onChange={onChangeHandler}
          value={data.pincode}
          type="text"
          placeholder="Pincode"
        />
        <input
          required
          name="address"
          onChange={onChangeHandler}
          value={data.address}
          type="text"
          placeholder="Address (Area and Street)"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City/District/Town"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="checkbox-field">
          <input type="checkbox" id="sameAddress" />
          <label htmlFor="sameAddress">Same as Billing Address</label>
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Order Summary</h2>
          <div className="cart-total-details">
            <p>Order Total</p>
            <p>Rs. {getTotalCartAmount()}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Charges</p>
            <p>Rs. {deliveryFee}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total Payable</p>
            <p>Rs. {totalPayable}</p>
          </div>
          <button type="submit" className="place-order-button">
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;