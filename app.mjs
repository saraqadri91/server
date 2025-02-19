import express from "express";

const app = express();
const port = process.env.port || 8080;

app.get("/", (req, res) => {
  res.send("This is  port ");
});
app.get("/sara", (req, res) => {
  res.send("This is sara port ");
});
app.get("/ayesha", (req, res) => {
  res.send("This is ayesha port ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
