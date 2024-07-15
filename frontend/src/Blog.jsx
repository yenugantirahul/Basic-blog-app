import { useEffect, useState } from "react";

const api = "http://localhost:8000";

const Blog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  const [blogs, setBlogs] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);

  async function fetchBlogs() {
    const response = await fetch(`${api}/getblogs`, {
      method: "GET",
    });
    const data = await response.json();
    setBlogs(data.blogs);
    console.log(data.blogs);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function deleteBlog(id) {
    await fetch(`${api}/deleteblog/${id}`, {
      method: "DELETE",
    });
    fetchBlogs();
  }

  async function create(e) {
    e.preventDefault();

    const response = await fetch(`${api}/createblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, author }),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setAuthor("");
      fetchBlogs();
      console.log("Blog created successfully");
    }
  }

  async function edit(e) {
    e.preventDefault();

    const response = await fetch(`${api}/editblog/${editBlogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, author }),
    });

    if (response.ok) {
      setTitle("");
      setDescription("");
      setAuthor("");
      setEditBlogId(null);
      setOpenEditForm(false);
      fetchBlogs();
      console.log("Blog updated successfully");
    }
  }

  return (
    <div>
      <h1 className="text-center text-7xl font-extrabold bg-black text-white w-fit items-center m-auto mt-5 p-5 rounded">
        This is a Blog
      </h1>
      <div>
        <form
          className="max-w-[90%] rounded-lg bg-sky-400 p-6 w-fit mt-20 m-auto items-center text-white text-center flex flex-col gap-10"
          onSubmit={openEditForm ? edit : create}
        >
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            className="bg-white text-2xl rounded-lg px-5 py-3.5"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter description"
            value={description}
            className="bg-white text-2xl rounded-lg pt-5 px-8 items-center"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter author"
            className="bg-white text-2xl rounded-lg px-5 py-3.5"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button className="bg-green-600 p-5 text-xl w-[97%] rounded-lg hover:bg-green-300">
            {openEditForm ? "Edit" : "Submit"}
          </button>
        </form>
      </div>

      <div className="flex h-[50px] m-auto p-10 flex-wrap gap-6 items-center">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-black m-auto h-fit w-[500px] rounded-lg flex flex-col gap-5 text-white p-10"
          >
            <h1 className="text-3xl font-semibold">
              <span className="font-extrabold">Title : </span>
              {blog.title}
            </h1>
            <p>
              <span className="font-extrabold text-3xl">Description : </span>
              {blog.description}
            </p>
            <span>
              <span className="font-extrabold text-3xl">Author : </span>
              {blog.author}
            </span>
            <button
              onClick={() => {
                setTitle(blog.title);
                setDescription(blog.description);
                setAuthor(blog.author);
                setEditBlogId(blog._id);
                setOpenEditForm(true);
              }}
              className="bg-slate-600 rounded-md p-2 items-center"
            >
              Edit
            </button>
            <button
              onClick={() => deleteBlog(blog._id)}
              className="bg-red-700 rounded-md p-2 items-center"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
