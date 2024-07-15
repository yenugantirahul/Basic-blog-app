const Blog = require("../models/taskModel");

const homeRoute = (req, res) => {
  res.json({
    message: "Hello",
  });
};

const createBlog = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;

  const newBlog = new Blog({
    title,
    description,
    author,
  });
  const savedBlog = await newBlog.save();
  const blogs = await Blog.find();
  res.json({
    blogs,
    message: "Blog created succesfully",
  });
};

const getBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.json({
    blogs,
  });
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  const deleteBlog = await Blog.findByIdAndDelete(id);
  const blogs = await Blog.find();
  if (!deleteBlog) {
    res.status(404).json({
      message: "Blog not found",
    });
  }
  res.json({
    blogs,
  });
};

const editBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description, author } = req.body;
  const updateBlog = await Blog.findByIdAndUpdate(id, {
    title,
    description,
    author,
  });

  const blogs = await Blog.find();

  res.json({
    blogs,
    message: "Blog edited successfully",
  });
};

module.exports = {
  homeRoute,
  createBlog,
  getBlogs,
  deleteBlog,
  editBlog,
};
