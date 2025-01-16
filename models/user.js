const { default: mongoose } = require("mongoose");

const usersSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
});

const usersModel = new mongoose.model("user", usersSchema);

module.exports = { usersModel };
