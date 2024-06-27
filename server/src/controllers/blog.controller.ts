import { NextFunction, Request, Response } from "express";
import blogModel from "../models/blog.model";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../models/user.model";
import { IBlog } from "../models/blog.model";

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const banner = data.banner;
    const ownerId = req.params.owner;

    if (banner) {
      const myCloud = await cloudinary.v2.uploader.upload(banner, {
        folder: "blogs",
      });
      data.banner = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    const newBlog = new blogModel({ ...data, owner: ownerId });
    await newBlog.save();

    await userModel.findByIdAndUpdate(ownerId, {
      $push: {
        blogs: newBlog._id,
      },
    });

    res.status(201).json({
      message: "Blog created successfully",
      newBlog,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = req.params.id;
    const blog = await blogModel.findById(blogId);
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const editBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const banner = data.banner;

    if (banner) {
      await cloudinary.v2.uploader.destroy(banner.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(banner, {
        folder: "blogs",
      });
      data.banner = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    const blogId = req.params.id;

    if (!blogId) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const blog = await blogModel.findByIdAndUpdate(
      blogId,
      { $set: data },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogId = req.params.id;

    const deleteBlog = await blogModel.findByIdAndDelete(blogId);
    const ownerId = deleteBlog?.owner;
    await userModel.findByIdAndUpdate(ownerId, {
      $pull: { blogs: blogId },
    });

    if (!deleteBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getBlogsByOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerId = req.params.owner;

    if (!ownerId) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const blogs = await blogModel.find({ owner: ownerId }).exec();
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        message: "No blogs found for the user",
      });
    }
    res.status(200).json(blogs);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};
