const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

module.exports = mongoose.model("classrooms", classroomSchema);
