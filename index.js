const express = require("express");
const data = require("./data.json");
const fs = require("fs");
const { default: mongoose } = require("mongoose");
const { middlewarefn } = require("./middleware");
const userRouter = require("./routes/routes");
const { connectDB } = require("./connection");

const app = express();

app.use(express.urlencoded({ extended: false }));

// Middleware is Here
app.use(middlewarefn());

// Database Start From Here

connectDB();

// Schema for the mongodb

// REST ful API

app.use("/api", userRouter);

app.listen(8000, () => console.log("server is connected"));
