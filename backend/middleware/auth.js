import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token; // Fixed token extraction
    if (!token) {
        return res.json({ success: false, message: "Not Authorized" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Fixed userId issue
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;
