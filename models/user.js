import mongoose from "mongoose";

// Check if the model is already defined
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// If the model already exists, use it; otherwise, create a new one
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
