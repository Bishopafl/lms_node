const Student = require("../model/Academic/Student");
const verifyToken = require("../utils/verifyToken");

const isStudentLogin = async (req, res, next) => {
    const headerObj = req.headers;
    const token     = headerObj?.authorization?.split(" ")[1];// using optional chaining

    //verify token
    const verifiedToken = verifyToken(token);

    if(verifiedToken.msg == "Invalid token") {
        const err = new Error("Token expired/invalid");
        next(err);
    } else {
        // find the admin
        const user = await Student.findById(verifiedToken.id).select('name email role');
        // save user into req.obj
        req.userAuth = user;
        next();
    }
    
};

module.exports = isStudentLogin;