const express = require("express");
const {
  handledeleteuser,
  handleedituser,
  handlecreateuser,
  handleusergetbyId,
  handlegetallusers,
} = require("../controllers");

const router = express.Router();

router.get("/", handlegetallusers);

// GET users by id

router.get("/:id", handleusergetbyId);

// POST users

router.post("/", handlecreateuser);

// PATCH users

router.patch("/", handleedituser);

router.delete("/:id", handledeleteuser);

module.exports = router;
