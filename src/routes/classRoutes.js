const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { isEqual } = require("lodash");
const { base64encode } = require("nodejs-base64");
const userSchema = require("../models/userModels");
const { classroomSchema } = require("../models/classModels");

require("dotenv").config();

// middleware to verify the jwt token extracted from bearer header
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

// create a classroom - used by teachers
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

    const unique_passcode = base64encode(req.user.email + "@" + name);
    const newClassroom = new classroomSchema({
      name,
      creator: req.user.email,
      passcode: unique_passcode,
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

// join a classroom - used by students
route.post("/join", authHandler, async (req, res) => {
  try {
    if (!req.user) return;

    // if req.user is a teacher
    if (req.user.isTeacher === true) {
      res.status(403).json({ msg: "Only students can join classrooms" });
      return;
    }

    const { passcode } = req.body;
    let classroom = await classroomSchema.findOne({ passcode });

    // if the classroom does not exist in the database
    if (!classroom) return res.status(400).json({ msg: "Invalid Passcode" });

    const classroomExists = await req.user.classrooms.find((classroom_id) =>
      isEqual(classroom_id, classroom._id)
    );

    // if the classroom exists in the student's classrooms array
    if (classroomExists) {
      res.status(400).json({ msg: "Classroom already joined" });
      return;
    }

    // add the student's email to the classroom's students array
    classroom.students.push(req.user.email);
    classroom = await classroomSchema.findOneAndUpdate({ passcode }, classroom);

    // add the classroom id to the student's classrooms array
    req.user.classrooms.push(classroom._id);
    let newuser = await req.user.save();

    // return the response
    populated_newuser = await newuser.populate("classrooms");

    res.json({
      msg: "Successfully joined classroom",
      classrooms: populated_newuser.classrooms,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = route;
