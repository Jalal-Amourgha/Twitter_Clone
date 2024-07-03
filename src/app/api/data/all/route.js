import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import User from "@/models/user";

export const GET = async (request) => {
  try {
    await connectToDB();
    const posts = await Post.find({});
    const users = await User.find({});

    return new Response(JSON.stringify({ users, posts }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
};
