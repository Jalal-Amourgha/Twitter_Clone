import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    creator: {
      type: String,
    },
    post: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
    },
    comments: {
      type: Array,
    },
    reposts: {
      type: Array,
    },
    bookmarks: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
