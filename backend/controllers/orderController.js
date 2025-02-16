import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { log } from "console";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Place Order
const placeOrder = async (req, res) => {
  const frontend_url="http://localhost:3000";
  try {
    const { userId, items, amount, address } = req.body;

    // Create a new order in the database
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // Clear the user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create a Razorpay order
    const options = {
      amount: amount * 100, // Amount in paise (e.g., 100 INR = 10000 paise)
      currency: "INR",
      receipt: `order_${newOrder._id}`,
      payment_capture: 1, // Auto-capture payment
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      order_id: razorpayOrder.id,
      amount: options.amount,
      currency: options.currency,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error creating order" });
  }
};

// Verify Payment
const verifyOrder = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  try {
    // Generate the expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature === signature) {
      // Payment is successful
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      // Payment failed
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

// Fetch User Orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};

// List All Orders (Admin Only)
const listOrders = async (req, res) => {
  // try {
  //   const userData = await userModel.findById(req.body.userId);
  //   if (userData && userData.role === "admin") {
  //     const orders = await orderModel.find({});
  //     res.json({ success: true, data: orders });
  //   } else {
  //     res.json({ success: false, message: "You are not authorized to view all orders" });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.json({ success: false, message: "Error fetching all orders" });
  // }
  try{
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:"error"} )
  }
};

// Update Order Status (Admin Only)
const updateStatus = async (req, res) => {
  // try {
  //   const userData = await userModel.findById(req.body.userId);
  //   if (userData && userData.role === "admin") {
  //     await orderModel.findByIdAndUpdate(req.body.orderId, {
  //       status: req.body.status,
  //     });
  //     res.json({ success: true, message: "Order status updated successfully" });
  //   } else {
  //     res.json({ success: false, message: "You are not authorized to update order status" });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.json({ success: false, message: "Error updating order status" });
  // }
  try{
    
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
}
catch(error){
  console.log(error);
  res.json({succes:false,message:"error"});
}
};

// Export all functions
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };