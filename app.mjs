import express from "express";

const app = express();
const port = 9807;

app.get("/", (req, res) => {
  res.send("Hello Server");
});

// Route to get the current day of the week (0-6, where 0 = Sunday)
app.get("/day", (req, res) => {
  res.json({ day: new Date().getDay() });
});

// Route to get the full date and time
app.get("/day/date", (req, res) => {
  res.json({ date: new Date().toLocaleString() });
});

app.get("/day/date/year", (req, res) => {
  res.json({ year: new Date().getFullYear() });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
