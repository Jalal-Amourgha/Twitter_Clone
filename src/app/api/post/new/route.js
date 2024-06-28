import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { userId, post } = await request.json();

  console.log(`hada ana ajalal dw ${userId}`);

  try {
    await connectToDB();

    const newPost = new Post({
      creator: userId,
      post: post,
      likes: [],
      comments: [],
      reposts: [],
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new post", { status: 500 });
  }
};
