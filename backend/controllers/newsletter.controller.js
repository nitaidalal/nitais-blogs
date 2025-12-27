import Subscriber from '../models/Subscriber.js';
import { sendWelcomeEmail } from '../config/email.js';
import jwt from 'jsonwebtoken';

export const generateUnsubscribeToken = (subscriber) => {
    return jwt.sign(
      {
        subId: subscriber._id,
        email: subscriber.email,
        purpose: "unsubscribe",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // link valid for 7 days
    );
}

// Subscribe to newsletter
export const subscribe = async (req, res) => {
    try {
        const { user } = req.body;
        console.log("Subscribe request for user:", user);

        // Check if already subscribed
        const existing = await Subscriber.findOne({ user: user.id });
        

        if (existing) {
            if (existing.isSubscribed) {
                // return res.status(400).json({ 
                //     success: false, 
                //     message: 'Already subscribed!' 
                // });
                
                const unsubscribeToken = generateUnsubscribeToken(existing);
                await sendWelcomeEmail(user.email, user.name, unsubscribeToken);
                return res.status(200).json({
                  success: true,
                  message: "Welcome back! Subscription reactivated.",
                });
            } else {
                // Reactivate subscription 
                const unsubscribedToken = generateUnsubscribeToken(existing);
                existing.isSubscribed = true;
                existing.unsubscribedAt = null;
                await existing.save();

                await sendWelcomeEmail(user.email, user.name, unsubscribedToken);

                return res.status(200).json({ 
                    success: true, 
                    message: 'Welcome back! Subscription reactivated.'
                });
            }
        }

        // Create new subscription
        const newSubscriber = await Subscriber.create({
            user: user.id,
            email: user.email,
            name: user.name
        });

        await newSubscriber.save();
        const unsubscribeToken = generateUnsubscribeToken(newSubscriber);
        // Send welcome email
        await sendWelcomeEmail(user.email, user.name, unsubscribeToken);

        res.status(201).json({ 
            success: true, 
            message: 'Successfully subscribed! Check your email.' 
        });

    } catch (error) {
        console.error('Subscribe error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to subscribe' 
        });
    }
};

// Unsubscribe from newsletter
export const unsubscribe = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
          return res.status(400).json({success: false ,message:"Invalid unsubscribe link."});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.purpose !== "unsubscribe") {
          return res.status(400).json({success: false, message:"Invalid unsubscribe token."});
        }

        const subscriber = await Subscriber.findOne({ email: decoded.email });

        if (!subscriber) {
            return res.status(404).json({ 
                success: false, 
                message: 'Not subscribed' 
            });
        }

        subscriber.isSubscribed = false;
        subscriber.unsubscribedAt = new Date();
        await subscriber.save();

        res.status(200).json({ 
            success: true, 
            message: 'Unsubscribed successfully' 
        });

    } catch (error) {
        console.error('Unsubscribe error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to unsubscribe' 
        });
    }
};
