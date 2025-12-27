import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ success: false, message: "No token provided" });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        
        //i will implement this if needed in future
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decoded; // to know about the logged in user in future
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}
export default adminAuth