const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

  attachments: [
    {
      type: String,
      required: false,
    },
  ],
});

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
      type: Schema.Types.ObjectId,
      ref: "users",
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
module.exports = {
  assignmentSchema: assignmentModel,
  classroomSchema: classroomModel,
};
