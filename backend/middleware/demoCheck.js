import jwt from 'jsonwebtoken';

// Middleware to block write operations for demo admin
export const blockDemoWrites = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // If demo admin trying to write
        if (decoded.isDemo && req.method !== 'GET') {
            return res.status(403).json({
                success: false,
                message: "Demo mode: You can only view, not modify data"
            });
        }

        next();
    } catch (error) {
        next();
    }
};
