import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    images: {
      type: [String], // cloudinary url
      default: [],
    },
    imagePublicIds: {
      type: [String], // cloudinary public IDs
      default: [],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    volunteers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
