const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const { isEqual } = require("lodash");
const { base64encode } = require("nodejs-base64");
const userSchema = require("../models/userModels");
const {
  classroomSchema,
  assignmentSchema,
  recordSchema,
} = require("../models/classModels");
const { validator, authHandler } = require("./utils");

require("dotenv").config();

// create an assignment - used by teachers
route.post("/create", authHandler, async (req, res) => {
  try {
    if (!req.user) return;

    const { title, statement, deadline, classroom_id } = req.body;

    // validate input fields
    const err = validator(
      [title, statement, deadline, classroom_id],
      ["title", "statement", "deadline", "classroom_id"]
    );
    if (err) {
      res.status(400).json({ msg: err });
      return;
    }

    // get the classroom from the database that matches the id
    const classroom = await classroomSchema.findById(classroom_id);

    // if the classroom with the provided classroom_id does not exist
    if (!classroom) {
      res.status(400).json({ msg: "Invalid classroom id" });
      return;
    }

    // if the user is not the owner of this classroom
    if (req.user.email !== classroom.creator) {
      res
        .status(403)
        .json({ msg: "Only classroom owner can create assignments" });
      return;
    }

    // create a new assignment object
    let newAssignment = new assignmentSchema({
      title,
      statement,
      deadline,
      classroom_id: classroom_id,
    });

    // save the new assignment object into the database
    const retAssignment = await newAssignment.save();

    // push the new assignment in the classroom's assignments array
    classroom.assignments.push(retAssignment);
    const newClassroom = await classroomSchema.findByIdAndUpdate(
      classroom_id,
      classroom
    );

    // back populate the classroom objects in the user's classrooms array
    populated_newuser = await req.user.populate("classrooms");

    // return the json response
    res.json({
      msg: "Successfully created assignment",
      classrooms: populated_newuser.classrooms,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// submit an assignment - used by students
route.post("/submit", authHandler, async (req, res) => {
  try {
    if (!req.user) return;

    const { answer, email, assignment_id } = req.body;

    // validate input fields
    const err = validator(
      [answer, email, assignment_id],
      ["answer", "email", "assignment_id"]
    );
    if (err) {
      res.status(400).json({ msg: err });
      return;
    }

    // get the assginment from the database that matches the id
    let assignment = await assignmentSchema.findById(assignment_id);

    // if the assignment with the provided assignment_id does not exist
    if (!assignment) {
      res.status(400).json({ msg: "Invalid assignment id" });
      return;
    }

    // get the classroom from the database to which the assignment belongs
    const classroom = await classroomSchema.findById(assignment.classroom_id);

    // check whether the student belongs to this classroom
    const validStudent = await classroom.students.find((student_mail) =>
      isEqual(email, student_mail)
    );
    if (!validStudent) {
      res.status(403).json({ msg: "You are not enrolled into this classroom" });
      return;
    }

    // check whether the deadline of the assignment is over or not
    if (
      assignment.deadline.slice(0, 10) <
      new Date(Date.now()).toISOString().slice(0, 10)
    ) {
      res.status(403).json({ msg: "Deadline over for the submission" });
      return;
    }

    // create a new record
    let record = new recordSchema({
      student: email,
      submission: answer,
    });

    // push the new record into the assginment's records array
    assignment.records.push(record);

    // update the corresponding assignment object in the classroom
    await classroomSchema.updateOne(
      { _id: classroom._id, "assignments._id": assignment._id },
      {
        $set: {
          "assignments.$.records": assignment.records,
        },
      }
    );

    // back populate the classrooms array of req.user
    populated_newuser = await req.user.populate("classrooms");

    // return the json response
    res.json({
      msg: "Successfully submitted assignment",
      classrooms: populated_newuser.classrooms,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = route;
