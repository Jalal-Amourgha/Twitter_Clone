import { Schema, model, models } from "mongoose";

const CommentShema = new Schema(
  {
    creator: {
      type: String,
    },
    postId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Comment = models.Comment || model("Comment", CommentShema);

export default Comment;
