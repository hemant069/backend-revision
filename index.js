const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello GET");
});

app.listen(8000, () => console.log("server is connected"));
