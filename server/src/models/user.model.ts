require("dotenv").config();
import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
  blogs: ObjectId[];
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next: any) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
