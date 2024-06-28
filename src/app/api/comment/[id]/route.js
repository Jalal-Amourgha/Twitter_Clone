import Comment from "@/models/comment";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const comment = await Comment.find({
      postId: params.id,
    });

    return new Response(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { commentId, userId, type } = await request.json();

  try {
    await connectToDB();

    const CommentSelected = await Comment.findOne({
      _id: commentId,
    });

    if (type === "like") {
      if (CommentSelected.likes.includes(userId)) {
        CommentSelected.likes = CommentSelected.likes.filter(
          (id) => id !== userId
        );
      } else {
        CommentSelected.likes = [...CommentSelected.likes, userId];
      }
    }

    await CommentSelected.save();

    return new Response("Successfully updated the FollowerUser FollowedUser", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Updating FollowerUser FollowedUser", {
      status: 500,
    });
  }
};
