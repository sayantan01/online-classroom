const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { isEqual } = require("lodash");
const userSchema = require("../models/userModel");
const classroomSchema = require("../models/classModel");

require("dotenv").config();

const authHandler = async (req, res, next) => {
  try {
    const decoded = await jwt.verify(req.token, process.env.SECRET);
    const email = decoded.email;
    const user = await userSchema.findOne({ email });
    if (!user) res.status(401).json({ msg: "User unauthorized" });
    else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(401).json({ msg: "User unauthorized" });
    next();
  }
};

route.post("/create", authHandler, async (req, res) => {
  try {
    if (!req.user) return;
    if (req.user.isTeacher !== true) {
      res.status(403).json({ msg: "Only teachers can create classrooms" });
      return;
    }
    const { name } = req.body;
    let classroom = await classroomSchema.findOne({ name });
    if (classroom) {
      const classroomExists = await req.user.classrooms.find((classroom_id) =>
        isEqual(classroom_id, classroom._id)
      );

      if (classroomExists) {
        res
          .status(400)
          .json({ msg: "Another classroom with same name already exists" });
        return;
      }
    }

    const newClassroom = new classroomSchema({
      name,
      creator: req.user.name,
      passcode: "abcd",
    });
    const retClassroom = await newClassroom.save();
    req.user.classrooms.push(retClassroom._id);
    let newuser = await req.user.save();
    populated_newuser = await newuser.populate("classrooms");
    res.json({
      msg: "Successfully created classroom",
      classrooms: populated_newuser.classrooms,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = route;
