import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 9807;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/", express.static(path.join(__dirname, "frontend/dist")));

app.get("/", (req, res) => {
  res.send("GET request running");
});

app.get("/weather", (req, res) => {
  res.json({ user: "tobi" });
});

app.get("/weather/:cityName", (req, res) => {
  res.json(req.params);
});

app.get("/weather/:cityName/:side", (req, res) => {
  res.json(req.params);
});

// Middleware to handle unmatched routes
app.use((req, res) => {
  res.send("Middleware running - Route not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
