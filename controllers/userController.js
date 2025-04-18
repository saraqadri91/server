import User from "../models/user.js"; // Ensure correct path
import bcrypt from "bcryptjs"; // Import bcrypt
import jwt from "jsonwebtoken"
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await User.create({ name, email, password });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Hide passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Error logging in:", error); // Improved error logging
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;   // Get user ID from request params
        const { name, email } = req.body; // New data from request body

        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { name, email }, 
            { new: true }  // Return updated user
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
};
export const deleteUser = async (req, res) => {
  try {
      const { id } = req.params;

      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) return res.status(404).json({ message: "User not found" });

      res.json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
  }
};

