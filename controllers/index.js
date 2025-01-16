const { usersModel } = require("../models/user");

const handlegetallusers = async (req, res) => {
  try {
    const response = await usersModel.find({});

    return res.status(201).send({ msg: "users found successfully", response });
  } catch (error) {
    return res.send(error);
  }
};

const handleusergetbyId = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await usersModel.findOne({ _id: id });
    return res.status(201).send({ msg: "user find success", user });
  } catch (error) {
    return res.status(404).send({ msg: "something went wrong " });
  }
};

const handlecreateuser = async (req, res) => {
  const body = req.body;

  const existingmail = body.email;

  try {
    const existinguser = await usersModel.findOne({ email: existingmail });

    console.log(existinguser);
    if (!existinguser) {
      const user = usersModel(body);
      user.save();
      return res.send(user);
    } else {
      return res.status(404).send({ msg: "email already existing" });
    }
  } catch (error) {
    return res.send(error);
  }
};

const handleedituser = async (req, res) => {
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
};

const handledeleteuser = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteuser = await usersModel.deleteOne({ _id: id });
    return res.status(200).send({ msg: "delete user success", deleteuser });
  } catch (error) {
    return res.send({ msg: "something went wrong", error });
  }
};

module.exports = {
  handlecreateuser,
  handledeleteuser,
  handleedituser,
  handlegetallusers,
  handleusergetbyId,
};
