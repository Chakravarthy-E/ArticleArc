import { Response } from "express";
import blogModel from "../models/blog.model";

export const createBlog = async (data: any, res: Response) => {
  const blog = await blogModel.create(data);
  res.status(201).json({
    status: true,
    blog,
  });
};
