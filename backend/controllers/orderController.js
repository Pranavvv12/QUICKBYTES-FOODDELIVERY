import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { log } from "console";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrder = async (req, res) => {
  const frontend_url="https://quickbytes-fooddelivery-frontend.onrender.com";
  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `order_${newOrder._id}`,
      payment_capture: 1, 
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
const verifyOrder = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature === signature) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching user orders" });
  }
};
const listOrders = async (req, res) => {
  try{
    const orders=await orderModel.find({});
    res.json({success:true,data:orders})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:"error"} )
  }
};
const updateStatus = async (req, res) => {
  try{
    
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
}
catch(error){
  console.log(error);
  res.json({succes:false,message:"error"});
}
};
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
