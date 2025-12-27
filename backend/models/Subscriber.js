import mongoose, { Schema, model } from "mongoose";


const subscriberSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },

    unsubscribedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Subscriber = model("Subscriber", subscriberSchema);
export default Subscriber;