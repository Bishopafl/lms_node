const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
  {
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
    dateEmployed: {
      type: Date,
      default: Date.now,
    },
    // randomizes a  number between 1 and 999 to make the id unique for each teacher
    teacherId: {
      type: String,
      required: true,
      default: function() {
        return (
          "TEA" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4) +
          this.name
            .split(" ")
            .map(function(name) {return name[0]; })
            .join("")
            .toUpperCase()
        );
      },
    },
    // if withdrawn, the teacher will not be able to login
    isWithdrawn: {
      type: Boolean,
      default: false,
    },
    // if suspended, the teacher can login but cannot perform any task
    isSuspended: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "teacher",
    },
    subject: {
      type: String,
    },
    // when you are registered, teacher goes through approval stage
    applicationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    program: {
      type: String,
    },
    // A teacher can teach in more than one class level
    classLevel: {
      type: String,
    },
    academicYear: {
      type: String
    },
    examsCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      // required: true,
    },
    academicTerm: {
      type: String,
    },
  },
  { timestamps: true }
);

// Model
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
