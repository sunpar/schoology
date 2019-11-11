const express = require("express");
const cors = require("cors");
const words = require("an-array-of-english-words");
const app = express();
const PORT = 8000;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(cors());

app.get("/search/:term", (req, res) => {
  // res.status(200).send(JSON.stringify(req.params.term));
  const term = req.params.term.toLowerCase();
  const reg = new RegExp(`^${term}`, "g");

  const found = words.filter(element => reg.test(element));
  res.status(200).send(JSON.stringify(found));
});

app.listen(PORT, function() {
  console.log("Server is running on port:", PORT);
});
