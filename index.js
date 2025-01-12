const express = require("express");
const data = require("./data.json");
const fs = require("fs");
const { json } = require("stream/consumers");

const app = express();

app.use(express.urlencoded({ extended: false }));

// REST ful API

// GET all the users
app.get("/api", (req, res) => {
  const response = data.map((item, i) => item.first_name);
  res.send(response);
});

// GET users by id

app.get("/api/:id", (req, res) => {
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

// PATCH users

app.patch("/api/:id", (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email, gender } = req.body;

  const user = data.find((item, i) => item.id === parseInt(id));

  if (parseInt(id) > 0 && parseInt(id) < data.length) {
    (user.first_name = first_name),
      (user.last_name = last_name),
      (user.email = email),
      (user.gender = gender);
    fs.writeFile("./data.json", JSON.stringify(data), (data, err) => {
      res.send({ status: 200 });
    });
  } else {
    res.send({ status: 401 });
  }
});

app.listen(8000, () => console.log("server is connected"));
