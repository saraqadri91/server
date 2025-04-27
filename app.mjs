import express from "express";
import cors from "cors";
import connectToDb from "./db/db.js"; // Ensure the correct path
import userRoutes from "./routes/userRoutes.js"; // Ensure this file exists

const app = express();

// Middleware
app.use(express.json()); // Important to parse JSON requests
app.use(cors());
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
app.use("/api/users", userRoutes); // Ensure correct route path

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectToDb(); // Ensure MongoDB connects before starting
  console.log(`Server is running on http://localhost:${PORT}`);
});
