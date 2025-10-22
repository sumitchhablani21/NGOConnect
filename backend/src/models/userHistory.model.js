import mongoose, { Schema } from "mongoose";

const userHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    events: {
      type: [Schema.Types.ObjectId],
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    status: {
      type: String,
      enum: ["signedUp", "attended", "completed", "absent"],
      default: "signedUp",
    },
    feedback: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const UserHistory = mongoose.model("UserHistory", userHistorySchema);
