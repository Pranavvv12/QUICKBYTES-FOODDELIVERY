import userModel from "../models/userModel.js";

// Add to Cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData is initialized

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error adding to cart" });
    }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {}; // Ensure cartData exists

        if (cartData[req.body.itemId] > 1) {
            cartData[req.body.itemId] -= 1;
        } else {
            delete cartData[req.body.itemId]; // Remove item if count is 0
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error removing from cart" });
    }
};

// Get Cart Data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching cart" });
    }
};

export { addToCart, removeFromCart, getCart };
