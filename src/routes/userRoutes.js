const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModels");
const { classroomSchema } = require("../models/classModels");

require("dotenv").config();

// create an user account
route.post("/signup", async (req, res) => {
  try {
    const { name, email, password, usertype } = req.body;
    if (usertype !== "teacher" && usertype !== "student") {
      res.status(400).json({ msg: "Invalid user type" });
      return;
    }
    const user = await userSchema.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "Email already exists" });
      return;
    }

    hashed_password = await bcrypt.hash(password, 8);
    isTeacher = usertype === "teacher" ? true : false;
    let newUser = new userSchema({
      name,
      email,
      password: hashed_password,
      isTeacher,
    });
    const retuser = await newUser.save();
    res.json({ user: retuser });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// login by a user if already registered
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      res.status(403).json({ msg: "User does not exist" });
      return;
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      res.status(403).json({ msg: "Incorrect password" });
      return;
    }

    const token = await jwt.sign({ email }, process.env.SECRET, {
      expiresIn: "1h",
    });
    populated_user = await user.populate("classrooms");
    res.json({
      token,
      email,
      isTeacher: populated_user.isTeacher,
      classrooms: populated_user.classrooms,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = route;
