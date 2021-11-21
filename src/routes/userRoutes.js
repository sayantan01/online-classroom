const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModels");
const { classroomSchema } = require("../models/classModels");
const { validator } = require("./utils");

require("dotenv").config();

// create an user account
route.post("/signup", async (req, res) => {
  try {
    const { name, email, password, usertype } = req.body;

    // validate input fields
    const err = validator(
      [name, email, password, usertype],
      ["name", "email", "password", "usertype"]
    );
    if (err) {
      res.status(400).json({ msg: err });
      return;
    }

    // if usertype is neither "teacher" nor "student"
    if (usertype !== "teacher" && usertype !== "student") {
      res.status(400).json({ msg: "Invalid user type" });
      return;
    }

    // check if the given email already exists in the database or not
    const user = await userSchema.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "Email already exists" });
      return;
    }

    // hash the password
    hashed_password = await bcrypt.hash(password, 8);

    // set isTeacher field based on the usertype
    isTeacher = usertype === "teacher" ? true : false;

    // create a new user object
    let newUser = new userSchema({
      name,
      email,
      password: hashed_password,
      isTeacher,
    });

    // save the user object in database
    const retuser = await newUser.save();

    // return the json response
    res.json({ user: retuser });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// login by a user
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate input fields
    const err = validator([email, password], ["email", "password"]);
    if (err) {
      res.status(400).json({ msg: err });
      return;
    }

    // check if the given email exists in the database or not
    const user = await userSchema.findOne({ email });
    if (!user) {
      res.status(403).json({ msg: "User does not exist" });
      return;
    }

    // if email exists, compare the password stored in database with the input password
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      res.status(403).json({ msg: "Incorrect password" });
      return;
    }

    // generate jwt token
    const token = await jwt.sign({ email }, process.env.SECRET, {
      expiresIn: "1h",
    });

    // back populate the classroom objects in the user's classrooms array
    populated_user = await user.populate("classrooms");

    // return the json response
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
