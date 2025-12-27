import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const Register = async (req, res) => {
    //implement now
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists with this email" });
        }   
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        
        // Generate token for auto-login after registration
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: "user" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        
        res.status(201).json({ 
            success: true, 
            message: "User registered successfully",
            token,
            role: "user",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
        
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and Password are required" });
    }

    // Check if it's the real admin or demo admin
    const isRealAdmin =
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD;
    const isDemoAdmin =
      email === process.env.DEMO_ADMIN_EMAIL &&
      password === process.env.DEMO_ADMIN_PASSWORD;

    if (isRealAdmin || isDemoAdmin) {
      // Admin login
      const token = jwt.sign(
        { email, isDemo: isDemoAdmin, },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        success: true,
        message: isDemoAdmin
          ? "Demo Admin logged in successfully"
          : "Admin logged in successfully",
        token,
        isDemo: isDemoAdmin,
        role: 'admin',
      });
    }

    // If not admin, check user database
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // Verify user password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // User login successful
    const token = jwt.sign(
      { id: user._id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: "user",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
