import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const PATCH = async (request, { params }) => {
  const { newPost } = await request.json();

  console.log(newPost, params.id);

  try {
    await connectToDB();

    const postSelected = await Post.findOne({
      _id: params.id,
    });

    console.log(postSelected);

    postSelected.post = newPost;

    await postSelected.save();

    return new Response("Successfully updated the post ", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Updating post", {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Post.deleteOne({ _id: params.id });

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
