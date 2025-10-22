import mongoose, { Schema } from "mongoose";

const donationSchema = new Schema(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Donor ID is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    currency: {
      type: String,
      default: "Rs. ",
    },
    transactionId: {
      type: String,
      required: [true, "Transaction ID is required"],
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
