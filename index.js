const express = require("express");
const data = require("./data.json");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: false }));

// Middleware is Here
app.use((req, res, next) => {
  console.log("Hello middle ware is here");
  next();
});

// Database Start From Here

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(err));

// Schema for the mongodb

const usersSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
});

const usersModel = new mongoose.model("user", usersSchema);

// REST ful API

// GET all the users
app.get("/api", async (req, res) => {
  try {
    const response = await usersModel.find({});

    return res.send(response);
  } catch (error) {
    return res.send(error);
  }
});

// GET users by id

app.get("/api/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await usersModel.findOne({ _id: id });
    return res.send({ msg: "user find success", user });
  } catch (error) {
    return res.send({ msg: "something went wrong " });
  }
});

// POST users

app.post("/api", async (req, res) => {
  const body = req.body;

  console.log(body);

  try {
    const user = usersModel(body);
    user.save();
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
});

// PATCH users

app.patch("/api/:id", async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email } = req.body;
  try {
    const user = await usersModel.findOne({ _id: id });

    if (user) {
      const updateduser = await usersModel.findByIdAndUpdate(
        id,
        {
          $set: {
            first_name,
            last_name,
            email,
          },
        },
        { new: true }
      );
      updateduser.save();
      return res
        .status(201)
        .send({ msg: "user updated successfully", updateduser });
    }
  } catch (error) {
    return res.status(500).send({ msg: "something went wrong", error: error });
  }
});

app.delete("/api/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteuser = await usersModel.deleteOne({ _id: id });
    return res.send({ msg: "delete user success", deleteuser });
  } catch (error) {
    return res.send({ msg: "something went wrong", error });
  }
});

app.listen(8000, () => console.log("server is connected"));
