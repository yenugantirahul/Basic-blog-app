const express = require("express");
const {
  homeRoute,
  createBlog,
  getBlogs,
  deleteBlog,
  editBlog,
} = require("../controllers/task");

const router = express.Router();

router.get("/", homeRoute);

router.post("/createblog", createBlog);
router.get("/getblogs", getBlogs);
router.delete("/deleteblog/:id", deleteBlog);
router.put("/editblog/:id", editBlog);

module.exports = router;
