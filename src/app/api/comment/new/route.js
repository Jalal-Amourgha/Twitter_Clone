import Comment from "@/models/comment";
import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const POST = async (request) => {
  const { userId, postId, comment } = await request.json();

  try {
    await connectToDB();

    const findPost = await Post.findOne({
      _id: postId,
    });

    const newComment = new Comment({
      creator: userId,
      postId: postId,
      comment: comment,
      likes: [],
    });

    findPost.comments.push(userId);

    await newComment.save();

    await findPost.save();

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new post", { status: 500 });
  }
};
