const express = require("express");
const { createClassLevel, getClassLevel, getClassLevels, updateClassLevel, deleteClassLevel } = require("../../controller/academics/classLevelCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const classLevelRouter = express.Router();

/**
 * updated chained routes
 */
classLevelRouter
  .route("/")
  .post(isLogin, isAdmin, createClassLevel)
  .get(isLogin, isAdmin, getClassLevels);

classLevelRouter
  .route("/:id")
  .get(isLogin, isAdmin, getClassLevel)
  .put(isLogin, isAdmin, updateClassLevel)
  .delete(isLogin, isAdmin, deleteClassLevel);

module.exports = classLevelRouter;
