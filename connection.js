const { default: mongoose } = require("mongoose");

async function connectDB() {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/users");
  } catch (error) {
    console.error("Mongoose Error", error);
  }
}

module.exports = { connectDB };
