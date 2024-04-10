const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin        = require("../../model/Staff/Admin");


/**
 * @description Create Academic Year
 * @route POST /api/admins/academic-years
 * @access Private
 */
exports.createAcademicYear = AsyncHandler(async (req, res) => {
    const { name, fromYear, toYear  } = req.body;
    // cehck if the year exists
    const academicYear = await AcademicYear.findOne({name});
    if(academicYear){
        throw new Error("Academic year already exists");
    }
    // create
    const academicYearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id
    })

    res.status(201).json({
        status: 'success',
        message: "Academic year created",
        data: academicYearCreated,
    });

});

/**
 * @description Get All Academic Years
 * @route GET /api/admins/academic-years
 * @access Private
 */
exports.getAcademicYears = AsyncHandler(async (req, res) => {
    const academicYears = await AcademicYear.find();

    res.status(201).json({
        status: 'success',
        message: "Academic years fetched successfully",
        data: academicYears,
    });

});