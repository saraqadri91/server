// import express from "express";
// import User from "../models/user.js"; // Ensure correct import
// import { registerUser, getUsers } from "../controllers/userController.js";

// const router = express.Router(); // Define router

// // Debugging: Check if API route is hit
// router.get("/", async (req, res) => {
//   console.log("🔍 API /api/users/ hit");
//   try {
//     const users = await User.find({}, { password: 0 }); // Hide passwords
//     console.log("✅ Users fetched:", users);
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("❌ Error fetching users:", error);
//     res.status(500).json({ message: "Error fetching users", error });
//   }
// });

// // User Registration Route
// router.post("/register", registerUser);

// export default router;
import express from "express";import { protect } from "../middleware/authMiddleware.js"; 
import {
  registerUser,
  getUsers,
  loginUser,
  updateUser,
  deleteUser 
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
import { protect } from "../middleware/authMiddleware.js"; // ADD THIS
router.post("/login", loginUser);
import { protect } from "../middleware/authMiddleware.js"; // ADD THIS
router.get("/", getUsers);
import { protect } from "../middleware/authMiddleware.js"; // ADD THIS
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
