const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema to hold the submission of a student for a particular assignment
const recordSchema = Schema({
  student: {
    type: String,
    required: true,
  },

  submission: {
    type: String,
    required: true,
  },
});

// schema for the assignments
const assignmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  statement: {
    type: String,
    required: false,
  },

  createdAt: {
    type: String,
    default: new Date(Date.now()).toUTCString().slice(0, 16),
  },

  deadline: {
    type: String,
    default: new Date(Date.now()).toUTCString().slice(0, 16),
  },

  records: [
    {
      type: recordSchema,
      default: {},
    },
  ],

  classroom_id: {
    type: Schema.Types.ObjectId,
  },
});

// schema for the classrooms
const classroomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  creator: {
    type: String,
    required: true,
  },

  passcode: {
    type: String,
    required: true,
  },

  students: [
    {
      type: String,
    },
  ],

  assignments: [
    {
      type: assignmentSchema,
      default: {},
    },
  ],
});

const assignmentModel = mongoose.model("assignments", assignmentSchema);
const classroomModel = mongoose.model("classrooms", classroomSchema);
const recordModel = mongoose.model("records", recordSchema);

module.exports = {
  assignmentSchema: assignmentModel,
  classroomSchema: classroomModel,
  recordSchema: recordModel,
};
