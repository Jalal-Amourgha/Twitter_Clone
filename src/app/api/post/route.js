import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
  const { type, postId, userId } = await request.json();

  try {
    await connectToDB();

    const PostSelected = await Post.findOne({
      _id: postId,
    });

    if (type === "like") {
      if (PostSelected.likes.includes(userId)) {
        PostSelected.likes = PostSelected.likes.filter((id) => id !== userId);
      } else {
        PostSelected.likes = [...PostSelected.likes, userId];
      }
    } else if (type === "repost") {
      if (PostSelected.reposts.includes(userId)) {
        PostSelected.reposts = PostSelected.reposts.filter(
          (id) => id !== userId
        );
      } else {
        PostSelected.reposts = [...PostSelected.reposts, userId];
      }
    } else if (type === "bookmark") {
      if (PostSelected.bookmarks.includes(userId)) {
        PostSelected.bookmarks = PostSelected.bookmarks.filter(
          (id) => id !== userId
        );
      } else {
        PostSelected.bookmarks = [...PostSelected.bookmarks, userId];
      }
    }

    await PostSelected.save();

    return new Response("Successfully updated Post", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Updating Post", {
      status: 500,
    });
  }
};
