const express = require("express");
const data = require("./data.json");
const fs = require("fs");
const { json } = require("stream/consumers");

const app = express();

app.use(express.urlencoded({ extended: false }));

// REST ful API

// GET all the users
app.get("/", (req, res) => {
  const response = data.map((item, i) => item.first_name);
  res.send(response);
});

// GET users by id

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const response = data.find((item, i) => item.id === Number(id));
  res.send(response);
});

// POST users

app.post("/api", (req, res) => {
  const body = req.body;

  data.push({ ...body, id: data.length + 1 });

  fs.writeFile("./data.json", JSON.stringify(data), (data, err) => {
    return res.send({ status: 200 });
  });
});

app.listen(8000, () => console.log("server is connected"));
