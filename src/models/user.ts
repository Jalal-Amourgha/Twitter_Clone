import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    name: {
      type: String,
      required: [true, "Username is required!"],
    },
    username: {
      type: String,
      unique: [true, "Username already exists!"],
      required: [true, "Username is required!"],
    },
    img: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
    },
    followers: {
      type: Array,
    },
    following: {
      type: Object,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
