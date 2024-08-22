import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getAllTags,
  getBlog,
  getBlogsByOwner,
  getBlogsByTag,
} from "../controllers/blog.controller";

const blogRouter = express.Router();

blogRouter.post("/create-blog/:owner", createBlog);
blogRouter.get("/get-all-blogs", getAllBlogs);
blogRouter.get("/get-blog/:id", getBlog);
blogRouter.put("/edit-blog/:id", editBlog);
blogRouter.delete("/delete/:id", deleteBlog);
blogRouter.get("/get-blogs-by-owner/:owner", getBlogsByOwner);
blogRouter.get("/tags", getAllTags);
blogRouter.get("/tag/:tag", getBlogsByTag);

export default blogRouter;
