// import Razorpay from "razorpay";
// import crypto from "crypto";
// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import { log } from "console";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const placeOrder = async (req, res) => {
//   const frontend_url="https://quickbytes-fooddelivery-frontend.onrender.com";
//   try {
//     const { userId, items, amount, address } = req.body;

//     const newOrder = new orderModel({
//       userId,
//       items,
//       amount,
//       address,
//     });
//     await newOrder.save();

//     await userModel.findByIdAndUpdate(userId, { cartData: {} });
//     const options = {
//       amount: amount * 100, 
//       currency: "INR",
//       receipt: `order_${newOrder._id}`,
//       payment_capture: 1, 
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     res.json({
//       success: true,
//       order_id: razorpayOrder.id,
//       amount: options.amount,
//       currency: options.currency,
//       order: newOrder,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error creating order" });
//   }
// };
// const verifyOrder = async (req, res) => {
//   const { orderId, paymentId, signature } = req.body;
//   try {
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(`${orderId}|${paymentId}`)
//       .digest("hex");

//     if (generatedSignature === signature) {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       res.json({ success: true, message: "Payment verified successfully" });
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Payment verification failed" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error verifying payment" });
//   }
// };
// const userOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ userId: req.body.userId });
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error fetching user orders" });
//   }
// };
// const listOrders = async (req, res) => {
//   try{
//     const orders=await orderModel.find({});
//     res.json({success:true,data:orders})
//   }
//   catch(error){
//     console.log(error);
//     res.json({success:false,message:"error"} )
//   }
// };
// const updateStatus = async (req, res) => {
//   try{
    
//   await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
//     res.json({success:true,message:"Status Updated"})
// }
// catch(error){
//   console.log(error);
//   res.json({succes:false,message:"error"});
// }
// };
// export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user._id;

    const order = new orderModel({ userId, items, amount, address });
    await order.save();

    const razorOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `order_rcptid_${order._id}`,
    });

    order.razorpayOrderId = razorOrder.id;
    await order.save();

    res.json({ success: true, order: razorOrder, orderId: order._id });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to place order" });
  }
};

// Verify Razorpay Payment
export const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const order = await orderModel.findOne({ razorpayOrderId: razorpay_order_id });

      if (order) {
        order.payment = true;
        await order.save();
        return res.json({ success: true, message: "Payment verified" });
      }

      return res.status(404).json({ success: false, message: "Order not found" });
    } else {
      await orderModel.findOneAndDelete({ razorpayOrderId: razorpay_order_id });
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Verification failed" });
  }
};

// Get all orders for Admin
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch orders" });
  }
};

// Get orders of logged-in user
export const userOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch your orders" });
  }
};

// Update order status (Admin only)
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update order status" });
  }
};
