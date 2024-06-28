import Comment from "@/models/comment";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { userId, postId, comment } = await request.json();

  try {
    await connectToDB();

    const newComment = new Comment({
      creator: userId,
      postId: postId,
      comment: comment,
      likes: [],
    });

    await newComment.save();

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new post", { status: 500 });
  }
};
