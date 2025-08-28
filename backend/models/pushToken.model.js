import mongoose from "mongoose";

const pushTokenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,   // Optional field
      trim: true       // Removes extra spaces
    },
    token: {
      type: String,
      required: true,
      unique: true,    // Prevent duplicate tokens in DB
      index: true      // Makes token lookups faster
    }
  },
  {
    timestamps: true   // Adds createdAt & updatedAt fields
  }
);

export default mongoose.model("PushToken", pushTokenSchema);
