import express from "express"; 

const app = express();
const port = 30000;

app.get("/", (req, res) => {
  res.send("This is ayesha port ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
