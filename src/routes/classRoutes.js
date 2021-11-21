const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const { isEqual } = require("lodash");
const { base64encode } = require("nodejs-base64");
const userSchema = require("../models/userModels");
const { classroomSchema } = require("../models/classModels");
const { validator, authHandler } = require("./utils");

require("dotenv").config();

// create a classroom - used by teachers
route.post("/create", authHandler, async (req, res) => {
  try {
    if (!req.user) return;

    // check whether the user is a teacher or not
    if (req.user.isTeacher !== true) {
      res.status(403).json({ msg: "Only teachers can create classrooms" });
      return;
    }

    const { name } = req.body;

    // validate input fields
    const err = validator([name], ["classroom name"]);
    if (err) {
      res.status(400).json({ msg: err });
      return;
    }

    // check whether the user has created another classroom with same name
    let classroom = await classroomSchema.findOne({
      name,
      creator: req.user.email,
    });
    if (classroom) {
      res
        .status(400)
        .json({ msg: "Another classroom with same name already exists" });
      return;
    }

    // generate the unique passcode
    const unique_passcode = base64encode(req.user.email + "@" + name);

    // create a classroom object
    const newClassroom = new classroomSchema({
      name,
      creator: req.user.email,
      passcode: unique_passcode,
    });

    // save the classroom object into databse
    const retClassroom = await newClassroom.save();

    // push the id of the new classroom to the user's classrooms array
    req.user.classrooms.push(retClassroom._id);
    let newuser = await req.user.save();

    // back populate the classroom objects in the user's classrooms array
    populated_newuser = await newuser.populate("classrooms");

    // return the json response
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

    // check whether the user is a teacher
    if (req.user.isTeacher === true) {
      res.status(403).json({ msg: "Only students can join classrooms" });
      return;
    }

    const { passcode } = req.body;

    // validate input fields
    const err = validator([passcode], ["passcode"]);
    if (err) {
      res.status(400).json({ msg: err });
      return;
    }

    // get the classroom from the database that matches the passcode
    let classroom = await classroomSchema.findOne({ passcode });

    // if the classroom does not exist in the database
    if (!classroom) return res.status(400).json({ msg: "Invalid Passcode" });

    // check whether that classroom already exists in the user's classrooms array
    const classroomExists = await req.user.classrooms.find((classroom_id) =>
      isEqual(classroom_id, classroom._id)
    );
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

    // back populate the classroom objects in the user's classrooms array
    populated_newuser = await newuser.populate("classrooms");

    // return the json response
    res.json({
      msg: "Successfully joined classroom",
      classrooms: populated_newuser.classrooms,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// return the list of classrooms for a user
route.get("/fetch", authHandler, async (req, res) => {
  try {
    if (!req.user) return;
    populated_user = await req.user.populate("classrooms");
    res.json({
      classrooms: populated_user.classrooms,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = route;
