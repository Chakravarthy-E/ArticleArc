require("dotenv").config();
import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IBlog extends Document {
  banner: {
    public_id: string;
    url: string;
  };
  title: string;
  description: string;
  owner: ObjectId;
  tag: string;
}

const blogSchema: Schema<IBlog> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter your name"],
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    banner: {
      public_id: String,
      url: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tag: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const blogModel: Model<IBlog> = mongoose.model("Blog", blogSchema);
export default blogModel;
