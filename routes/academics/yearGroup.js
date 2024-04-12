const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const { createYearGroup, getYearGroups, getYearGroup, updateYearGroup, deleteYearGroup } = require("../../controller/academics/yearGroupsCtrl");

const yearGroupRouter = express.Router();

/**
 * updated chained routes
 */
yearGroupRouter
  .route('/')
  .post(isLogin, isAdmin, createYearGroup)
  .get(isLogin, isAdmin, getYearGroups);


yearGroupRouter
  .route("/:id")
  .get(isLogin, isAdmin, getYearGroup)
  .put(isLogin, isAdmin, updateYearGroup)
  .delete(isLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;
