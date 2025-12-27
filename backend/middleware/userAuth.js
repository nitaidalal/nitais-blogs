import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("User Auth Middleware Token:", token);
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if it's a user token (not admin)
        if (decoded.role === 'admin') {
            return res.status(403).json({ success: false, message: "Access denied. User authentication required." });
        }
        
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default userAuth;
