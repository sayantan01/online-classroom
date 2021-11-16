const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isTeacher: {
    type: Boolean,
    default: true,
  },

  classrooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "classrooms",
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
