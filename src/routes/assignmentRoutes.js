const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { isEqual } = require("lodash");
const { base64encode } = require("nodejs-base64");
const userSchema = require("../models/userModels");
const { classroomSchema, assignmentSchema } = require("../models/classModels");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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
    console.log(err);
    res.status(401).json({ msg: "User unauthorized" });
    next();
  }
};

// create an assignment
route.post(
  "/create",
  authHandler,
  upload.single("attachment"),
  async (req, res) => {
    try {
      if (!req.user) return;

      const { title, statement, deadline, classroom_id } = req.body;
      const classroom = await classroomSchema.findById(classroom_id);

      // the classroom with the provided classroom_id does not exist
      if (!classroom) {
        res.status(400).json({ msg: "Invalid classroom id" });
        return;
      }

      // the teacher is not the owner of this classroom
      if (req.user.email !== classroom.creator) {
        res
          .status(403)
          .json({ msg: "Only classroom owner can create assignments" });
        return;
      }

      // create the new assignment object
      let newAssignment = new assignmentSchema({
        title,
        statement,
        deadline,
      });
      newAssignment.attachments.push(req.file.filename);

      // save the new assignment in the database
      const retAssignment = await newAssignment.save();

      // push the id of the new assignment in the classroom
      classroom.assignments.push(retAssignment);
      const newClassroom = await classroomSchema.findByIdAndUpdate(
        classroom_id,
        classroom
      );

      // back populate the classrooms array of req.user
      populated_newuser = await req.user.populate("classrooms");

      // return the response
      res.json({
        msg: "Successfully created assignment",
        classrooms: populated_newuser.classrooms,
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
);

route.get('/download/:filename', (req, res)=>{
  try {
    console.log(req.params)
  const filename = __dirname + "../../../uploads/" + req.params.filename
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.download(filename)
}
  catch(err) {
    console.log(err);
    res.json({msg: "error occurred"})
  }
})

module.exports = route;
