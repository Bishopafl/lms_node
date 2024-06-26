const AsyncHandler = require("express-async-handler");
const ExamResult = require("../../model/Academic/ExamResults");
const Student = require("../../model/Academic/Student");

/**
 * @description Exam results check
 * @route       POST /api/v1/exam-results/:id/check
 * @access      Private Students Only
 */
exports.checkExamResults = AsyncHandler(async (req, res) => {
  // find the student with request object
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    throw new Error("No student found");
  }
  // get exam result from database using params id and student's _id
  const examResult = await ExamResult.findOne({
    studentID: studentFound.studentId,
    _id: req.params.id,
  })
    .populate("exam")
    .populate("classLevel")
    .populate("academicTerm")
    .populate("academicYear");
  if (!examResult) {
    throw new Error("Exam results not found");
  }
  // check if exam is published
  if (examResult?.isPublished === false) {
    throw new Error("Exam results is not available, check out later");
  }
  res.json({
    status: "success",
    message: "Exam Results",
    data: examResult,
    student: studentFound,
  });
});

/**
 * @description Get all exam results (name, id)
 * @route       POST /api/v1/exam-results
 * @access      Private Students Only
 */
exports.getExamResults = AsyncHandler(async (req, res) => {
  const results = await ExamResult.find().select("exam").populate("exam");
  res.status(200).json({
    status: "success",
    message: "Exam results retrieved successfully",
    data: results,
  });
});

/**
 * @description Admin publish exam results
 * @route       PUT /api/v1/exam-results/:id/admin-toggle-publish
 * @access      Private Students Only
 */
exports.adminToggleExamResult = AsyncHandler(async (req, res) => {
  // find the exam results
  const examResult = await ExamResult.findById(req.params.id);
  if (!examResult) {
    throw new Error("Exam result not found");
  }
  const publishResult = await ExamResult.findByIdAndUpdate(
    req.params.id,
    {
      isPublished: req.body.publish,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    message: "Exam results Updated",
    data: publishResult,
  });
});
